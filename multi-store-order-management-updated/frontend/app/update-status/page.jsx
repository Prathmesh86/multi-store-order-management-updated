"use client";

import Link from "next/link";
import { useState } from "react";
import { apiRequest } from "../../lib/api";

export default function UpdateStatusPage() {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState("PREPARING");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const updateStatus = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const result = await apiRequest(`/orders/${orderId.trim()}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status })
      });
      setMessage(`Order status updated successfully to ${result.data.status}`);
      setOrderId("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <div className="card page-card">
        <h1>Update Order Status</h1>
        <p className="muted">
          Paste here MongoDB ID. You get this ID after creating an order or from the Orders List table.
        </p>

        <form onSubmit={updateStatus} className="grid">
          <div>
            <label>MongoDB Order ID</label>
            <input value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="Paste MongoDB Order ID here" required />
            <small className="helper-text">Example: 665f1a2b9c10a83b8f6d1234</small>
          </div>
          <div>
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="PLACED">PLACED</option>
              <option value="PREPARING">PREPARING</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
          </div>
          <div>
            <button type="submit" disabled={loading}>{loading ? "Updating..." : "Update Status"}</button>
          </div>
        </form>

        <div className="button-row" style={{ marginTop: "18px" }}>
          <Link href="/orders"><button type="button" className="secondary">Check All Orders</button></Link>
        </div>

        {message && <div className="message">{message}</div>}
        {error && <div className="error">{error}</div>}
      </div>
    </main>
  );
}
