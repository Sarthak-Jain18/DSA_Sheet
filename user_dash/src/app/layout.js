import "./globals.css";
import Navbar from "@/components/navbar/Navbar.jsx";
import Footer from "@/components/footer/Footer.jsx";

export const metadata = {
  title: "DSA UserDash",
  description: "Solve important DSA problems",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}