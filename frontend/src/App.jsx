import { useEffect, useState } from "react";
import {
  getAlerts,
  createAlert,
  updateAlert,
  deleteAlert,
} from "./api";

export default function App() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    country: "",
    city: "",
    visaType: "",
  });

  // Reusable Styles
  const inputStyle = {
    padding: "10px",
    width: "100%",
    maxWidth: "300px",
    boxSizing: "border-box",
    borderRadius: "6px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "14px"
  };

  const btnStyle = {
    padding: "8px 14px",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
    fontWeight: "500",
    transition: "0.2s",
    fontSize: "14px"
  };

  // 1. Initial Load (Uses the loading spinner)
  const loadAlerts = async () => {
    setLoading(true);
    try {
      const data = await getAlerts();
      setAlerts(data);
    } catch (error) {
      alert("Failed to load alerts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  // 2. Create Alert
  const handleCreate = async () => {
    if (!form.country || !form.city || !form.visaType) {
      alert("Please fill all fields");
      return;
    }
    try {
      await createAlert(form);
      setForm({ country: "", city: "", visaType: "" });
      // We reload here to get the new ID from the database
      loadAlerts();
    } catch (error) {
      alert("Failed to create alert");
    }
  };

  // 3. Update Status (SILENT UPDATE - No page refresh)
  const handleStatusUpdate = async (id, status) => {
    try {
      // API Call
      await updateAlert(id, status);
      
      // Update local state directly so the table doesn't flicker/disappear
      setAlerts(prevAlerts => 
        prevAlerts.map(alert => 
          alert._id === id ? { ...alert, status: status } : alert
        )
      );
    } catch (error) {
      alert("Failed to update status");
    }
  };

  // 4. Delete Alert (SILENT DELETE - No page refresh)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this alert?")) return;
    try {
      await deleteAlert(id);
      
      // Filter out the deleted alert from local state instantly
      setAlerts(prevAlerts => prevAlerts.filter(alert => alert._id !== id));
    } catch (error) {
      alert("Failed to delete alert");
    }
  };

  return (
    <div style={{ 
      padding: "40px 20px", 
      maxWidth: "900px", 
      margin: "0 auto", 
      textAlign: "center", 
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      color: "#333"
    }}>
      <h1 style={{ color: "#2c3e50", marginBottom: "30px" }}>Visa Slot Alerts</h1>

      {/* Create Alert Form Section */}
      <div style={{ 
        marginBottom: "50px", 
        padding: "30px", 
        backgroundColor: "#ffffff", 
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        border: "1px solid #f0f0f0"
      }}>
        <h2 style={{ marginTop: 0, fontSize: "1.2rem", color: "#666", marginBottom: "20px" }}>Create New Alert</h2>

        <input
          type="text"
          placeholder="Country"
          style={inputStyle}
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
        />
        <br /><br />
        <input
          type="text"
          placeholder="City"
          style={inputStyle}
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />
        <br /><br />
        <select
          style={inputStyle}
          value={form.visaType}
          onChange={(e) => setForm({ ...form, visaType: e.target.value })}
        >
          <option value="">Select Visa Type</option>
          <option value="Tourist">Tourist</option>
          <option value="Business">Business</option>
          <option value="Student">Student</option>
        </select>
        <br /><br />
        <button 
          onClick={handleCreate}
          style={{ ...btnStyle, backgroundColor: "#27ae60", color: "white", padding: "12px 30px" }}
        >
          Create Alert
        </button>
      </div>

      <h2 style={{ textAlign: "left", fontSize: "1.5rem", marginBottom: "20px" }}>Active Alerts</h2>

      {/* Logic for Handling Refresh vs Silent Updates */}
      {loading ? (
        <p style={{ fontSize: "1.1rem", color: "#666" }}>Loading Alerts...</p>
      ) : alerts.length === 0 ? (
        <p style={{ color: "#999", padding: "40px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
          No alerts found. Use the form above to add one.
        </p>
      ) : (
        <div style={{ overflowX: "auto", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "white", textAlign: "left" }}>
            <thead>
              <tr style={{ backgroundColor: "#f8f9fa", borderBottom: "2px solid #eee" }}>
                <th style={{ padding: "15px" }}>Country</th>
                <th style={{ padding: "15px" }}>City</th>
                <th style={{ padding: "15px" }}>Visa Type</th>
                <th style={{ padding: "15px" }}>Status</th>
                <th style={{ padding: "15px", textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert) => (
                <tr key={alert._id} style={{ borderBottom: "1px solid #f1f1f1" }}>
                  <td style={{ padding: "15px" }}>{alert.country}</td>
                  <td style={{ padding: "15px" }}>{alert.city}</td>
                  <td style={{ padding: "15px" }}>
                    <span style={{ padding: "4px 8px", backgroundColor: "#eef2f7", borderRadius: "4px", fontSize: "0.85rem" }}>
                      {alert.visaType}
                    </span>
                  </td>
                  <td style={{ padding: "15px" }}>
                    <span style={{ 
                      fontWeight: "bold", 
                      color: alert.status === "Booked" ? "#27ae60" : alert.status === "Expired" ? "#e74c3c" : "#f39c12" 
                    }}>
                      {alert.status || "Active"}
                    </span>
                  </td>
                  <td style={{ padding: "15px", textAlign: "center" }}>
                    <button
                      disabled={alert.status === "Booked"}
                      onClick={() => handleStatusUpdate(alert._id, "Booked")}
                      style={{ 
                        ...btnStyle, 
                        backgroundColor: alert.status === "Booked" ? "#f5f5f5" : "#ebf5fb", 
                        color: alert.status === "Booked" ? "#ccc" : "#2980b9", 
                        marginRight: "8px" 
                      }}
                    >
                      Book
                    </button>
                    <button
                      disabled={alert.status === "Expired"}
                      onClick={() => handleStatusUpdate(alert._id, "Expired")}
                      style={{ 
                        ...btnStyle, 
                        backgroundColor: alert.status === "Expired" ? "#f5f5f5" : "#fef5e7", 
                        color: alert.status === "Expired" ? "#ccc" : "#d35400", 
                        marginRight: "8px" 
                      }}
                    >
                      Expire
                    </button>
                    <button
                      onClick={() => handleDelete(alert._id)}
                      style={{ ...btnStyle, backgroundColor: "#fdedec", color: "#c0392b" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}