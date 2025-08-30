import { useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    role: "User",
    locations: ["Miami, FL", "Charleston, SC"],
    notificationPrefs: {
      tsunami: true,
      storm: true,
      frequency: "Immediate",
      contactMethod: "Email",
    },
    alertHistory: [
      { id: 1, type: "Tsunami Warning", date: "2025-08-28", status: "Acknowledged" },
      { id: 2, type: "Storm Alert", date: "2025-08-25", status: "Ignored" },
    ],
  });

  const handleNotificationChange = (e) => {
    const { name, type, checked, value } = e.target;
    setUser((prev) => ({
      ...prev,
      notificationPrefs: {
        ...prev.notificationPrefs,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Profile</h1>

      <section>
        <h2>User Information</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </section>

      <section>
        <h2>Notification Preferences</h2>
        <label>
          <input
            type="checkbox"
            name="tsunami"
            checked={user.notificationPrefs.tsunami}
            onChange={handleNotificationChange}
          />
          Tsunami Alerts
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="storm"
            checked={user.notificationPrefs.storm}
            onChange={handleNotificationChange}
          />
          Storm Alerts
        </label>
        <br />
        <label>
          Alert Frequency:
          <select
            name="frequency"
            value={user.notificationPrefs.frequency}
            onChange={handleNotificationChange}
            style={{ marginLeft: "10px" }}
          >
            <option value="Immediate">Immediate</option>
            <option value="Daily">Daily Digest</option>
            <option value="Weekly">Weekly</option>
          </select>
        </label>
        <br />
        <label>
          Contact Method:
          <select
            name="contactMethod"
            value={user.notificationPrefs.contactMethod}
            onChange={handleNotificationChange}
            style={{ marginLeft: "10px" }}
          >
            <option value="Email">Email</option>
            <option value="SMS">SMS</option>
            <option value="Push">Push Notification</option>
          </select>
        </label>
      </section>

      <section>
        <h2>Location Settings</h2>
        <ul>
          {user.locations.map((loc, i) => (
            <li key={i}>{loc}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Alert History</h2>
        <table border="1" cellPadding="5" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Alert Type</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {user.alertHistory.map((alert) => (
              <tr key={alert.id}>
                <td>{alert.type}</td>
                <td>{alert.date}</td>
                <td>{alert.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
