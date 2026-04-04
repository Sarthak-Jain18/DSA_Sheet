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
      <body className="bg-slate-950 text-white">
        <div className="fixed top-0 left-0 w-full z-50"><Navbar /></div>
        <main>{children}</main>
        <div className="fixed bottom-0 left-0 w-full z-50"><Footer /></div>
      </body>
    </html>
  );
}

