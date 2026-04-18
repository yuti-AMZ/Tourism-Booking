import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const team = [
  { name: "Hayat Z", role: "Founder & Product Lead" },
  { name: "Hayat M", role: "Content & Storyteller" },
  { name: "Hayat K", role: "Community Manager" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="relative" style={{ height: "70vh", minHeight: "400px" }}>
        <img
          src="https://images.unsplash.com/photo-1580746738099-b2d4b5d4b9b4?w=1400&auto=format&fit=crop"
          alt="Lalibela"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 h-full max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-12">
          <div className="flex-1 text-white">
            <span className="inline-block bg-primary/80 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
              About EthioTour
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
              Unveiling the Timeless<br />Beauty of Ethiopia
            </h1>
            <p className="text-white/80 leading-relaxed mb-8 max-w-lg text-sm">
              Our mission is to guide you through the ancient history, vibrant culture,
              and breathtaking landscapes of the Horn of Africa. We design responsible,
              immersive journeys that support local communities and protect natural heritage.
            </p>
            <Link href="/destinations" className="inline-block bg-primary text-primary-foreground font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
              Explore Destinations →
            </Link>
          </div>
          <div className="flex-shrink-0 w-full md:w-64 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white grid grid-cols-2 gap-4">
            {[
              { value: "50+", label: "Destinations" },
              { value: "1000+", label: "Travelers" },
              { value: "10+", label: "Years" },
              { value: "20+", label: "Local Guides" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-white/70 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="eth-stripe" />

      <section className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-6">
        {[
          { icon: "🏛️", title: "Cultural Heritage", desc: "We connect travelers with Ethiopia's 3,000-year-old civilization, ancient churches, and living traditions." },
          { icon: "🌿", title: "Responsible Travel", desc: "Every itinerary is designed to support local communities and protect Ethiopia's natural ecosystems." },
          { icon: "🤝", title: "Local Expertise", desc: "Our guides are born and raised in Ethiopia — they bring authentic knowledge and genuine hospitality." },
        ].map((item) => (
          <div key={item.title} className="border rounded-2xl p-6 bg-card hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">{item.icon}</div>
            <h3 className="font-bold text-base mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      <section className="bg-muted/40 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase">Our People</span>
          <h2 className="text-3xl font-bold mt-2">Meet the Creators</h2>
          <p className="text-muted-foreground mt-2 text-sm max-w-md mx-auto">
            A passionate team dedicated to sharing the wonders of Ethiopia with the world.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          {team.map((member) => (
            <div key={member.name} className="flex flex-col items-center text-center border rounded-2xl p-6 bg-card hover:shadow-lg transition-all hover:-translate-y-1 duration-200">
              <div className="w-16 h-16 rounded-full mb-3 flex items-center justify-center text-primary-foreground text-2xl font-bold bg-primary">
                {member.name.charAt(0)}
              </div>
              <h4 className="font-bold">{member.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative py-16 px-6 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1400&auto=format&fit=crop"
          alt="Simien Mountains"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-3xl mx-auto text-white">
          <span className="text-xs font-semibold text-primary-foreground/70 tracking-widest uppercase">Get in Touch</span>
          <h2 className="text-3xl font-bold mt-2 mb-3">Start Your Journey</h2>
          <p className="text-white/70 mb-8 max-w-lg text-sm">
            Ready to explore Ethiopia? Send us a message or request a tailored itinerary.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              { icon: <Mail className="w-5 h-5" />, label: "Email", lines: ["hello@ethiopia-discovery.com"] },
              { icon: <Phone className="w-5 h-5" />, label: "Phone", lines: ["+251 935 615 567", "+251 911 123 456"] },
              { icon: <MapPin className="w-5 h-5" />, label: "Office", lines: ["Bole, Addis Ababa", "Ethiopia"] },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-white mt-0.5">{item.icon}</div>
                <div>
                  <p className="text-xs text-white/60 font-semibold uppercase mb-1">{item.label}</p>
                  {item.lines.map((l) => <p key={l} className="text-sm">{l}</p>)}
                </div>
              </div>
            ))}
          </div>
          <Link href="/contact" className="inline-block bg-primary text-primary-foreground font-bold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity">
            Contact Us →
          </Link>
        </div>
      </section>

      <div className="eth-stripe" />
    </div>
  );
}
