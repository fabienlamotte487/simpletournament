import "./globals.css";

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="fr">
      <body className="py-2 px-5">
        <header>
          <h1>Suisse tournament</h1>
        </header> 
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
