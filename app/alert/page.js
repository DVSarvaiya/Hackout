"use client";
import { useState } from "react";

export default function AlertForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendAlert = async () => {
    const res = await fetch("/api/send-alert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, alertMessage: message }),
    });
    const data = await res.json();
    alert(data.message || "Something went wrong");
  };

  return (
    <div className="p-4 space-y-2">
      <input
        type="email"
        placeholder="Recipient Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full"
      />
      <textarea
        placeholder="Alert Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 w-full"
      />
      <button
        onClick={sendAlert}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Send Alert
      </button>
    </div>
  );
}
