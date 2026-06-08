"use client";

import { useState } from "react";
import { apiRequest } from "../../lib/api";

export default function OrdersPage() {
  const [storeName, setStoreName] = useState("");
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [meta, setMeta] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchOrders = async (pageNumber = 1, fetchAll = false) => {
    setError("");
    setLoading(true);

    try {
      const queryStoreName = fetchAll ? "" : storeName;
      const result = await apiRequest(`/orders?store_name=${encodeURIComponent(queryStoreName)}&page=${pageNumber}&limit=5`);
      setOrders(result.data);
      setMeta(result.meta);
      setPage(pageNumber);
    } catch (err) {
      setError(err.message);
      setOrders([]);
      setMeta(null);
    } finally {
      setLoading(false);
    }
  };

  const checkAllOrders = () => {
    setStoreName("");
    fetchOrders(1, true);
  };

  return (
    <main className="container">
      <div className="card page-card">
        <h1>Orders List</h1>
        <p className="muted">Enter name of your store to filter orders, or use Check All Orders to view every order.</p>

        <div className="grid">
          <div>
            <label>Store Name</label>
            <input value={storeName} onChange={(e) => setStoreName(e.target.value)} placeholder="Enter name of your store" />
          </div>
          <div>
            <button style={{ marginTop: "31px" }} onClick={() => fetchOrders(1)} disabled={loading || !storeName.trim()}>
              {loading ? "Loading..." : "Fetch Store Orders"}
            </button>
          </div>
          <div>
            <button className="secondary" style={{ marginTop: "31px" }} onClick={checkAllOrders} disabled={loading}>
              Check All Orders
            </button>
          </div>
        </div>

        {error && <div className="error">{error}</div>}
      </div>

      <div className="card table-wrapper">
        <table>
          <thead>
            <tr>
              <th>MongoDB Order ID</th>
              <th>Store Name</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan="6">No orders found. Create an order or click Check All Orders.</td></tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id || order.id}>
                  <td><code>{order._id || order.id}</code></td>
                  <td>{order.store_name}</td>
                  <td>{order.items.map((item) => `${item.item_id} x ${item.qty}`).join(", ")}</td>
                  <td>₹{order.total_amount}</td>
                  <td><span className="badge">{order.status}</span></td>
                  <td>{new Date(order.created_at).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {meta && (
          <div className="grid" style={{ marginTop: "20px", alignItems: "center" }}>
            <button className="secondary" disabled={page <= 1} onClick={() => fetchOrders(page - 1, !storeName)}>Previous</button>
            <p className="muted">Page {meta.page} of {meta.totalPages || 1} | Total Orders: {meta.totalOrders}</p>
            <button className="secondary" disabled={page >= meta.totalPages} onClick={() => fetchOrders(page + 1, !storeName)}>Next</button>
          </div>
        )}
      </div>
    </main>
  );
}
