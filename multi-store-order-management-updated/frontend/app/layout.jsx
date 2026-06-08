import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Multi-Store Order Management",
  description: "Professional full-stack order management system"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar">
          <h2>OrderFlow Pro</h2>
          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/create-order">Create Order</Link>
            <Link href="/orders">Orders List</Link>
            <Link href="/update-status">Update Status</Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
