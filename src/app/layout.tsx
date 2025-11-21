import "./globals.css";

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="fr">
      <body className="py-2 px-5">
        {children}
      </body>
    </html>
  );
}
