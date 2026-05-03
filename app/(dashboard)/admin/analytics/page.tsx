import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { BarChart3, Users, MapPin, Calendar, TrendingUp } from "lucide-react";
import StatusPieChart from "@/components/admin/status-pie-chart";
import RevenueBarChart from "@/components/admin/revenue-bar-chart";

export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  const session = await getAuthSession();
  if (!session || session.user.role !== "ADMIN") redirect("/");

  const [totalUsers, totalBookings, totalDestinations, totalRevenue, bookingsByStatus, popularDestinations, recentBookings] = await Promise.all([
    prisma.user.count(),
    prisma.booking.count(),
    prisma.destination.count(),
    prisma.booking.aggregate({ _sum: { totalPrice: true } }),
    prisma.booking.groupBy({ by: ["status"], _count: true }),
    prisma.destination.findMany({
      include: { _count: { select: { bookings: true, favorites: true } } },
      orderBy: { bookings: { _count: "desc" } },
      take: 5,
    }),
    prisma.booking.findMany({
      include: { destination: { select: { title: true } }, user: { select: { name: true, email: true } } },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
  ]);

  const revenue = totalRevenue._sum.totalPrice ?? 0;

  // Prepare Pie Chart Data
  const pieData = bookingsByStatus.map(b => ({
    name: b.status,
    value: b._count
  }));

  // Prepare Bar Chart Data (Last 6 Months Revenue)
  const recentMonths = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    return {
      month: d.getMonth(),
      year: d.getFullYear(),
      name: d.toLocaleDateString("en-US", { month: "short" }),
    };
  }).reverse();

  const revenueData = await Promise.all(
    recentMonths.map(async (m) => {
      // First day of month
      const start = new Date(m.year, m.month, 1);
      // First day of next month
      const end = new Date(m.year, m.month + 1, 1);
      
      const agg = await prisma.booking.aggregate({
        where: {
          createdAt: {
            gte: start,
            lt: end,
          },
          status: { not: "CANCELLED" }
        },
        _sum: { totalPrice: true }
      });
      
      return {
        name: m.name,
        revenue: agg._sum.totalPrice ?? 0,
      };
    })
  );

  const kpis = [
    { label: "Total Users", value: totalUsers, icon: <Users className="w-5 h-5" /> },
    { label: "Total Bookings", value: totalBookings, icon: <Calendar className="w-5 h-5" /> },
    { label: "Destinations", value: totalDestinations, icon: <MapPin className="w-5 h-5" /> },
    { label: "Total Revenue", value: `$${revenue.toLocaleString()}`, icon: <TrendingUp className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Admin Analytics</h1>
              <p className="text-sm text-muted-foreground">Platform overview</p>
            </div>
          </div>
          <Link href="/admin/destinations/new" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90">
            + Add Destination
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {kpis.map((s) => (
            <div key={s.label} className="border rounded-xl p-5 bg-card hover:shadow-sm transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                {s.icon}
              </div>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="border rounded-xl p-5 bg-card flex flex-col">
            <h2 className="font-bold mb-4">Revenue (Last 6 Months)</h2>
            <div className="flex-1 flex items-center justify-center min-h-[300px]">
              <RevenueBarChart data={revenueData} />
            </div>
          </div>

          <div className="border rounded-xl p-5 bg-card flex flex-col">
            <h2 className="font-bold mb-4">Booking Status Overview</h2>
            <div className="flex-1 flex items-center justify-center min-h-[300px]">
              <StatusPieChart data={pieData} />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 border rounded-xl bg-card overflow-hidden flex flex-col">
            <div className="px-5 py-4 border-b">
              <h2 className="font-bold">Recent Bookings</h2>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    {["User", "Destination", "Amount", "Status"].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3">
                        <p className="font-medium">{b.user.name}</p>
                      </td>
                      <td className="px-5 py-3 text-muted-foreground truncate max-w-[150px]">{b.destination.title}</td>
                      <td className="px-5 py-3 font-semibold text-primary">${b.totalPrice}</td>
                      <td className="px-5 py-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          b.status === "CONFIRMED" ? "bg-green-100 text-green-700" :
                          b.status === "CANCELLED" ? "bg-red-100 text-red-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>{b.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border rounded-xl p-5 bg-card flex flex-col">
            <h2 className="font-bold mb-4">Popular Destinations</h2>
            <div className="space-y-4 flex-1">
              {popularDestinations.map((d, i) => (
                <div key={d.id} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                  {d.images[0] && (
                    <Image
                      src={d.images[0]}
                      alt={d.title}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-lg object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{d.title}</p>
                    <p className="text-xs text-muted-foreground">{d._count.bookings} bookings</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
