import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container">
      <section className="hero">
        <h1>Multi-Store Order Management System</h1>
        <p>
          A clean and professional full-stack project built with Next.js, React,
          Node.js, Express, and MongoDB. It supports order creation by store name,
          order tracking, pagination, and status updates using MongoDB order IDs.
        </p>
      </section>

      <section className="grid" style={{ marginTop: "24px" }}>
        <div className="card">
          <h3>Create Orders</h3>
          <p className="muted">Create a store order and copy the generated MongoDB Order ID.</p>
          <Link href="/create-order"><button>Go to Create Order</button></Link>
        </div>
        <div className="card">
          <h3>View Orders</h3>
          <p className="muted">Search orders by store name or check all orders in one click.</p>
          <Link href="/orders"><button>Go to Orders List</button></Link>
        </div>
        <div className="card">
          <h3>Update Status</h3>
          <p className="muted">Paste the MongoDB Order ID and update order status professionally.</p>
          <Link href="/update-status"><button>Go to Update Status</button></Link>
        </div>
      </section>
    </main>
  );
}
