import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admindash.css";

function Admindash() {
  const navigate = useNavigate();

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // 🔹 FETCH ALL ISSUES (ADMIN)
  const fetchIssues = async () => {
    try {
      const res = await fetch(
        "https://issue-portal-b46v.onrender.com/admin_view_all_issues/",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error();

      const data = await res.json();
      setIssues(data.issues || []);
      setLoading(false);
      setError("");
    } catch {
      setError("Unable to load issues");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  // 🔹 UPDATE ISSUE STATUS
  const updateStatus = async (issueId, newStatus) => {
    setUpdatingId(issueId);

    try {
      const res = await fetch(
        `https://issue-portal-b46v.onrender.com/admin_update_issue_status/${issueId}/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Status update failed");
        return;
      }

      setIssues((prev) =>
        prev.map((issue) =>
          issue.id === issueId ? { ...issue, status: data.status } : issue
        )
      );
    } catch {
      alert("Network error");
    } finally {
      setUpdatingId(null);
    }
  };

  // 🗑️ DELETE ISSUE
  const deleteIssue = async (issueId) => {
    if (!window.confirm("Are you sure you want to delete this issue?")) return;

    setDeletingId(issueId);

    try {
      const res = await fetch(
        `https://issue-portal-b46v.onrender.com/admin_delete_issue/${issueId}/`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        alert("Delete failed");
        return;
      }

      setIssues((prev) => prev.filter((i) => i.id !== issueId));
    } catch {
      alert("Network error");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p>Loading issues...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-container">
      {/* 🔹 SIDEBAR (20%) */}
      <div className="admin-sidebar">
        <h2>Community Issue Portal</h2>

        <button onClick={() => navigate("/super_admin_create_admin")}>
          Create Admin
        </button>

        <button onClick={() => navigate("/super_admin_view_admins")}>
          View Admins
        </button>
      </div>

      {/* 🔹 MAIN CONTENT (80%) */}
      <div className="admin-main">
        <h2>All Reported Issues</h2>

        <div className="issues-grid">
          {issues.length === 0 ? (
            <p>No issues found</p>
          ) : (
            issues.map((issue) => (
              <div className="issue-card" key={issue.id}>
                {/* 🔽 YOUR EXISTING ISSUE CARD CODE */}
                <h3>{issue.title}</h3>
                <p>{issue.description}</p>
                <p>📍 {issue.location}</p>

                {issue.image && (
                  <img src={issue.image} alt="issue" />
                )}

                <p>Status: <b>{issue.status}</b></p>

                <div className="actions">
                  <button onClick={() => updateStatus(issue.id, "pending")}>
                    Pending
                  </button>
                  <button onClick={() => updateStatus(issue.id, "in_progress")}>
                    In Progress
                  </button>
                  <button onClick={() => updateStatus(issue.id, "resolved")}>
                    Resolved
                  </button>
                  <button onClick={() => deleteIssue(issue.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Admindash;
