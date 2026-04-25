import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AddDestinationForm from "@/components/admin/add-destination-form";

export default async function NewDestinationPage() {
  const session = await getAuthSession();
  if (!session || session.user.role !== "ADMIN") redirect("/");

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Add New Destination</h1>
      <AddDestinationForm />
    </div>
  );
}
