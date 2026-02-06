import "./globals.css";
import { Kantumruy_Pro } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"

const font = Kantumruy_Pro({
  subsets: ['latin'],
});

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="fr">
      <SpeedInsights />
      <body className={`${font.className} py-2`}>
        {children}
      </body>
    </html>
  );
}
