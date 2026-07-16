"use client";

// import { ThemeProvider as NextThemesProvider } from "next-themes";
// import { useRouter } from "next/navigation";

// export function Providers({ children }: { children: React.ReactNode }) {
//   const router = useRouter();

//   return (
//     <HeroUIProvider navigate={router.push}>
//       <NextThemesProvider attribute="class" defaultTheme="dark">
//         {children}
//       </NextThemesProvider>
//     </HeroUIProvider>
//   );
// }
// // app/providers.tsx
// "use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
