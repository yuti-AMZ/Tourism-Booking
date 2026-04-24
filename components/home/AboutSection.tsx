// About section

"use client";
import Image from "next/image";
import { Users, Globe, HeartHandshake, Star } from "lucide-react";

export default function AboutSection() {
  const team = [
    { name: "Hayat Z.", role: "Founder & Product Lead" },
    { name: "Hayat M.", role: "Content & Storyteller" },
    { name: "Hayat K.", role: "Community Manager" },
  ];
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-primary/5 to-background">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-14">
        {/* Left: Text & Values */}
        <div className="flex-1">
          <h2 className="text-4xl font-extrabold mb-4 text-primary">About EthioTour</h2>
          <blockquote className="italic text-lg text-muted-foreground mb-6 border-l-4 border-primary pl-4">
            “Travel is the only thing you buy that makes you richer.”
          </blockquote>
          <p className="mb-8 text-base text-muted-foreground">
            EthioTour is your gateway to the wonders of Ethiopia. We believe in <span className="text-primary font-semibold">authentic experiences</span>, <span className="text-primary font-semibold">local connections</span>, and <span className="text-primary font-semibold">sustainable travel</span> that benefits communities and preserves heritage.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            <div className="flex items-center gap-3 bg-card rounded-lg p-4 shadow-sm">
              <Globe className="w-7 h-7 text-primary" />
              <div>
                <div className="font-semibold">Cultural Immersion</div>
                <div className="text-xs text-muted-foreground">Live, taste, and celebrate Ethiopia’s diversity.</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-card rounded-lg p-4 shadow-sm">
              <HeartHandshake className="w-7 h-7 text-primary" />
              <div>
                <div className="font-semibold">Community Support</div>
                <div className="text-xs text-muted-foreground">Travel that uplifts local people and traditions.</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-card rounded-lg p-4 shadow-sm">
              <Users className="w-7 h-7 text-primary" />
              <div>
                <div className="font-semibold">Expert Local Guides</div>
                <div className="text-xs text-muted-foreground">Guided by passionate locals who know every story.</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-card rounded-lg p-4 shadow-sm">
              <Star className="w-7 h-7 text-primary" />
              <div>
                <div className="font-semibold">Unforgettable Memories</div>
                <div className="text-xs text-muted-foreground">Unique journeys, lasting friendships, and joy.</div>
              </div>
            </div>
          </div>
          <div className="mb-2 text-sm text-muted-foreground font-medium">Meet our team:</div>
          <div className="flex gap-4 flex-wrap">
            {team.map((member) => (
              <div key={member.name} className="bg-background border rounded-lg px-4 py-2 shadow-sm">
                <div className="font-semibold text-primary">{member.name}</div>
                <div className="text-xs text-muted-foreground">{member.role}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Right: Image */}
        <div className="flex-1 flex justify-center">
          <div className="w-full flex justify-center">
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="relative bg-black rounded-[2.5rem] border-[10px] border-neutral-300 shadow-2xl" style={{width: 260, height: 520, boxShadow: '0 8px 32px rgba(0,0,0,0.25)'}}>
                {/* Notch */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 w-24 h-5 bg-black rounded-b-2xl z-10" style={{borderBottomLeftRadius: 16, borderBottomRightRadius: 16, marginTop: -10}} />
                {/* Video */}
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/iBFMLP_XHIY?si=BKwRV60Q59QOehbj&autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3"
                  title="Ethiopia Travel Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-[2rem]"
                  style={{background: 'black'}}
                ></iframe>
                {/* Home bar */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-3 w-16 h-1.5 bg-neutral-400 rounded-full opacity-70" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
