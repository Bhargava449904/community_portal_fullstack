import { useEffect, useState } from "react";
import "./Sadminviewalladmin.css"

function ViewAdmins() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // 🔹 FETCH ADMINS
  const fetchAdmins = async () => {
    try {
      const res = await fetch(
        "https://issue-portal-b46v.onrender.com/super_admin_view_admins/",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to load admins");
        setLoading(false);
        return;
      }

      setAdmins(data.admins || []);
      setLoading(false);
    } catch {
      setError("Network error");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // 🗑️ DELETE ADMIN
  const deleteAdmin = async (adminId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this admin?"
    );

    if (!confirmDelete) return;

    setDeletingId(adminId);

    try {
      const res = await fetch(
        `https://issue-portal-b46v.onrender.com/super_admin_delete_admin/${adminId}/`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Delete failed");
        setDeletingId(null);
        return;
      }

      // ✅ Remove admin from UI
      setAdmins((prev) =>
        prev.filter((admin) => admin.id !== adminId)
      );
    } catch {
      alert("Network error");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p className="status-text">Loading admins...</p>;
  if (error) return <p className="status-text error">{error}</p>;

  return (
    <div className="admins-page">
      <h2>All Admins</h2>

      <div className="admins-grid">
        {admins.length === 0 ? (
          <p>No admins found</p>
        ) : (
          admins.map((admin) => (
            <div className="admin-card" key={admin.id}>
              <h3>{admin.username}</h3>
              <p>{admin.email}</p>
              <p className="date">
                Created:{" "}
                {new Date(admin.created_at).toLocaleDateString()}
              </p>

              <button
                className="btn delete"
                disabled={deletingId === admin.id}
                onClick={() => deleteAdmin(admin.id)}
              >
                {deletingId === admin.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ViewAdmins;
