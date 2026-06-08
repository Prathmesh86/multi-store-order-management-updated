"use client";

import Link from "next/link";
import { useState } from "react";
import { apiRequest } from "../../lib/api";

export default function CreateOrderPage() {
  const [storeName, setStoreName] = useState("");
  const [itemId, setItemId] = useState("");
  const [qty, setQty] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [createdOrderId, setCreatedOrderId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setCreatedOrderId("");
    setLoading(true);

    try {
      const payload = {
        store_name: storeName,
        items: [{ item_id: itemId, qty: Number(qty) }],
        total_amount: Number(totalAmount)
      };

      const result = await apiRequest("/orders", {
        method: "POST",
        body: JSON.stringify(payload)
      });

      const orderId = result.data._id || result.data.id;
      setCreatedOrderId(orderId);
      setMessage("Order created successfully.");
      setStoreName("");
      setItemId("");
      setQty(1);
      setTotalAmount(0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyOrderId = async () => {
    if (!createdOrderId) return;
    await navigator.clipboard.writeText(createdOrderId);
    setMessage("Order ID copied. Paste this MongoDB ID in Update Order Status.");
  };

  return (
    <main className="container">
      <div className="card page-card">
        <h1>Create Order</h1>
        <p className="muted">
          Enter store name and order details. After creating an order, copy the Order ID and paste it in Update Order Status.
        </p>

        <form onSubmit={handleSubmit} className="grid">
          <div>
            <label>Store Name</label>
            <input value={storeName} onChange={(e) => setStoreName(e.target.value)} placeholder="Enter name of your store" required />
          </div>
          <div>
            <label>Item ID</label>
            <input value={itemId} onChange={(e) => setItemId(e.target.value)} placeholder="Example: ITEM-501" required />
          </div>
          <div>
            <label>Quantity</label>
            <input type="number" min="1" value={qty} onChange={(e) => setQty(e.target.value)} required />
          </div>
          <div>
            <label>Total Amount</label>
            <input type="number" min="0" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} required />
          </div>
          <div>
            <button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Order"}</button>
          </div>
        </form>

        {createdOrderId && (
          <div className="message order-id-box">
            <strong>MongoDB Order ID:</strong>
            <code>{createdOrderId}</code>
            <p>Copy this order ID and paste it in the Update Order Status page.</p>
            <div className="button-row">
              <button type="button" onClick={copyOrderId}>Copy Order ID</button>
              <Link href="/update-status"><button type="button" className="secondary">Go to Update Status</button></Link>
            </div>
          </div>
        )}

        {message && <div className="message">{message}</div>}
        {error && <div className="error">{error}</div>}
      </div>
    </main>
  );
}
