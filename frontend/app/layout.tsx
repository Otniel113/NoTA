import type { Metadata } from "next";
import { DM_Serif_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  variable: "--font-dm-serif",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "NoTA - Public Notes",
  description: "Explore thoughts, ideas, and reflections shared by the community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${dmSerif.variable} ${inter.variable} ${jetbrainsMono.variable} bg-background-light text-text-main-light transition-colors duration-300 min-h-screen flex flex-col font-sans antialiased`}
      >
        <nav className="sticky top-0 z-50 w-full bg-sage-light px-6 py-4 shadow-sm transition-colors duration-300">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-display text-xl shadow-sm">
                N
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-800">
                NoTA
              </span>
            </div>
            <div className="flex-1 max-w-xl w-full">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-icons-round text-gray-400 text-xl group-focus-within:text-primary transition-colors">
                    search
                  </span>
                </div>
                <input
                  className="block w-full pl-11 pr-4 py-3 rounded-full border-none bg-background-light text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-primary/50 shadow-inner-light transition-all outline-none"
                  placeholder="Search public notes..."
                  type="text"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-end">
              <button className="bg-background-light hover:bg-white text-gray-700 px-5 py-2.5 rounded-full shadow-sm transition-all flex items-center gap-2 font-medium text-sm cursor-pointer">
                <span className="material-icons-round text-lg">login</span>
                Login
              </button>
              <button className="bg-primary hover:bg-[#c08d5f] text-white px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 font-medium text-sm cursor-pointer">
                <span className="material-icons-round text-lg">person_add</span>
                Register
              </button>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
