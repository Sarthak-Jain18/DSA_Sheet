import "./globals.css";
import Navbar from "@/components/navbar/Navbar.js";
import Footer from "@/components/footer/Footer.js";

export const metadata = {
  title: "DSA AdminDash",
  description: "Solve important DSA problems",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white min-h-screen flex flex-col">
        <div className="fixed top-0 left-0 w-full z-50"><Navbar /></div>
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

