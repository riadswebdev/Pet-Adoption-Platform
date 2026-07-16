import Link from "next/link";
import { PawPrint, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-lg">
        <div className="relative mb-8 inline-block">
          <span className="text-[150px] font-extrabold text-foreground/25 leading-none select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-gradient-primary rounded-3xl flex items-center justify-center shadow-2xl rotate-12 hover:rotate-0 transition-transform duration-500">
              <PawPrint size={48} className="animate-pulse" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-foreground mb-4">
          Oops! Page <span className="text-gradient">Not Found</span>
        </h1>
        <p className="text-foreground/60 text-lg mb-8 leading-relaxed">
          Looks like this page wandered off! The page you&apos;re looking for
          doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-bold px-8 py-3 rounded-full hover:opacity-90 transition-all shadow-lg"
          >
            <Home size={18} />
            Go Home
          </Link>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 bg-foreground/10 text-foreground font-semibold px-8 py-3 rounded-full hover:bg-foreground/20 transition-all"
          >
            Browse Pets
          </Link>
        </div>
      </div>
    </div>
  );
}
