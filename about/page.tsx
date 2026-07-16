import { Metadata } from "next";
import { Heart, Target, Users, Award, PawPrint } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | PetAdopt",
  description:
    "Learn about PetAdopt's mission to connect loving families with pets in need.",
};

const team = [
  {
    name: "Sarah Mitchell",
    role: "Founder & CEO",
    bio: "Animal welfare advocate with 15+ years in rescue and rehabilitation.",
    avatar: "SM",
    color: "#FF6B35",
  },
  {
    name: "James Carter",
    role: "Head of Adoptions",
    bio: "Dedicated to making the adoption process seamless and joyful for everyone.",
    avatar: "JC",
    color: "#FF3F6C",
  },
  {
    name: "Priya Sharma",
    role: "Veterinary Advisor",
    bio: "Certified veterinarian ensuring every pet is healthy before listing.",
    avatar: "PS",
    color: "#FF6B35",
  },
  {
    name: "Leo Torres",
    role: "Community Manager",
    bio: "Building connections between adopters, rescuers, and shelters nationwide.",
    avatar: "LT",
    color: "#FF3F6C",
  },
];

const stats = [
  { number: "12,000+", label: "Pets Adopted" },
  { number: "8,500+", label: "Happy Families" },
  { number: "350+", label: "Partner Shelters" },
  { number: "98%", label: "Satisfaction Rate" },
];

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#FF6B35]/10 text-[#FF6B35] px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <PawPrint size={16} />
            Our Story
          </div>
          <h1 className="text-5xl font-extrabold text-foreground mb-6">
            We Believe Every Pet Deserves a{" "}
            <span className="text-gradient">Loving Home</span>
          </h1>
          <p className="text-foreground/80 text-xl max-w-3xl mx-auto leading-relaxed">
            PetAdopt was founded in 2018 with a simple mission: to eliminate pet
            homelessness by making the adoption process transparent, easy, and
            heartwarming for both pets and their future families.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-foreground/5 border-y border-foreground/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-extrabold text-gradient mb-2">
                  {stat.number}
                </p>
                <p className="text-foreground/60 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart size={32} className="text-[#FF6B35]" />,
                title: "Our Mission",
                desc: "To connect loving families with pets in need of a forever home, making the adoption journey safe, simple, and fulfilling.",
                color: "#FF6B35",
              },
              {
                icon: <Target size={32} className="text-[#FF3F6C]" />,
                title: "Our Vision",
                desc: "A world where no healthy pet is euthanized and every animal lives in a caring, permanent home with access to food, shelter, and love.",
                color: "#FF3F6C",
              },
              {
                icon: <Award size={32} className="text-[#FF6B35]" />,
                title: "Our Values",
                desc: "Transparency, compassion, community, and accountability guide every decision we make for both the animals and families we serve.",
                color: "#FF6B35",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-foreground/5 border border-foreground/10 rounded-2xl p-8 flex flex-col items-start"
              >
                <div
                  className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-foreground/5 border-t border-foreground/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Meet the <span className="text-gradient">Team</span>
            </h2>
            <p className="text-foreground/70 max-w-xl mx-auto">
              Passionate people working every day to give animals a second
              chance at a wonderful life.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-background border border-foreground/10 rounded-2xl p-6 flex flex-col items-center text-center hover:-translate-y-2 transition-transform"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-extrabold text-white mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${member.color}, #FF3F6C)`,
                  }}
                >
                  {member.avatar}
                </div>
                <h3 className="font-bold text-foreground text-lg">
                  {member.name}
                </h3>
                <p className="text-[#FF6B35] text-sm font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
