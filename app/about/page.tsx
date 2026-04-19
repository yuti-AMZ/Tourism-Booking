import Link from "next/link";
import Image from "next/image";

const team = [
  { name: "Hayat Z", role: "Founder & Product Lead" },
  { name: "Hayat M", role: "Content & Storyteller" },
  { name: "Hayat K", role: "Community Manager" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">

      {/* HERO SECTION */}
      <section className="relative" style={{ height: "70vh", minHeight: "400px" }}>
        <Image
          src="/images/lalibela.jpg"
          alt="Lalibela"
          fill
          className="absolute inset-0 object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 h-full max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-12">
          <div className="flex-1 text-white">
            <span className="inline-block bg-primary/80 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
              About EthioTour
            </span>

            <h1 className="text-4xl md:text-5xl font-bold mb-5">
              Unveiling the Timeless<br />Beauty of Ethiopia
            </h1>

            <p className="text-white/80 mb-8 max-w-lg text-sm">
              Our mission is to guide you through Ethiopia’s history, culture,
              and landscapes while supporting local communities.
            </p>

            <Link
              href="/destinations"
              className="bg-primary px-6 py-3 rounded-xl font-bold inline-block"
            >
              Explore Destinations →
            </Link>
          </div>

          <div className="w-full md:w-64 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 grid grid-cols-2 gap-4 text-white">
            {[
              { value: "50+", label: "Destinations" },
              { value: "1000+", label: "Travelers" },
              { value: "10+", label: "Years" },
              { value: "20+", label: "Local Guides" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-xs text-white/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      {/* <section className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-6">
        {[
          { icon: "🏛️", title: "Cultural Heritage", desc: "Ancient history and traditions." },
          { icon: "🌿", title: "Responsible Travel", desc: "Support local communities." },
          { icon: "🤝", title: "Local Expertise", desc: "Guides with real knowledge." },
        ].map((item) => (
          <div key={item.title} className="border rounded-2xl p-6">
            <div className="text-3xl mb-3">{item.icon}</div>
            <h3 className="font-bold">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </section> */}

      {/* TEAM */}
      <section className="py-16 px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Meet the Creators</h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          {team.map((member) => (
            <div key={member.name} className="text-center border rounded-2xl p-6">
              <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center bg-primary text-white text-xl font-bold">
                {member.name.charAt(0)}
              </div>
              <h4 className="font-bold">{member.name}</h4>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="relative py-16 px-6">
        <Image
          src="/images/simien-mountains.jpg"
          alt="Simien Mountains"
          fill
          className="absolute inset-0 object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-3xl mx-auto text-white">
          <h2 className="text-3xl font-bold mb-4">Start Your Journey</h2>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              { label: "Email", lines: ["hello@ethiopia-discovery.com"] },
              { label: "Phone", lines: ["+251 935 615 567"] },
              { label: "Office", lines: ["Bole, Addis Ababa"] },
            ].map((item) => (
              <div key={item.label} className="bg-white/10 p-4 rounded-xl">
                <p className="text-xs opacity-70 mb-2">{item.label}</p>
                {item.lines.map((l) => (
                  <p key={l}>{l}</p>
                ))}
              </div>
            ))}
          </div>

          <Link
            href="/contact"
            className="bg-primary px-6 py-3 rounded-xl font-bold inline-block"
          >
            Contact Us →
          </Link>
        </div>
      </section>

    </div>
  );
}