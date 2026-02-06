import { useEffect, useState } from "react";
import "./admindash.css";

function Admindash() {
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
          headers: {
            "Content-Type": "application/json",
          },
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
          issue.id === issueId
            ? { ...issue, status: data.status }
            : issue
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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this issue?"
    );

    if (!confirmDelete) return;

    setDeletingId(issueId);

    try {
      const res = await fetch(
        `https://issue-portal-b46v.onrender.com/admin_delete_issue/${issueId}/`,
        {
          method: "POST", // change to DELETE if backend uses DELETE
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Delete failed");
        return;
      }

      // ✅ Remove issue from UI
      setIssues((prev) =>
        prev.filter((issue) => issue.id !== issueId)
      );
    } catch {
      alert("Network error");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p className="status-text">Loading issues...</p>;
  if (error) return <p className="status-text error">{error}</p>;

  return (
    <div className="admin-issues-page">
      <h2>All Reported Issues</h2>

      <div className="issues-grid">
        {issues.length === 0 ? (
          <p>No issues found</p>
        ) : (
          issues.map((issue) => (
            <div className="issue-card" key={issue.id}>
              <h3>{issue.title}</h3>
              <p className="desc">{issue.description}</p>
              <p className="location">📍 {issue.location}</p>

              {issue.image && (
                <img
                  src={issue.image}
                  alt="issue"
                  className="issue-image"
                />
              )}

              <p className="status">
                Status: <strong>{issue.status}</strong>
              </p>

              <div className="reported-by">
                <p><b>Reported by:</b></p>
                <p>{issue.reported_by.username}</p>
                <p>{issue.reported_by.email}</p>
              </div>

              {/* 🔹 ACTION BUTTONS */}
              <div className="actions">
                <button
                  className="btn pending"
                  disabled={
                    issue.status === "pending" ||
                    updatingId === issue.id
                  }
                  onClick={() => updateStatus(issue.id, "pending")}
                >
                  Pending
                </button>

                <button
                  className="btn in-progress"
                  disabled={
                    issue.status === "in_progress" ||
                    updatingId === issue.id
                  }
                  onClick={() =>
                    updateStatus(issue.id, "in_progress")
                  }
                >
                  In Progress
                </button>

                <button
                  className="btn resolved"
                  disabled={
                    issue.status === "resolved" ||
                    updatingId === issue.id
                  }
                  onClick={() => updateStatus(issue.id, "resolved")}
                >
                  Resolved
                </button>

                <button
                  className="btn delete"
                  disabled={deletingId === issue.id}
                  onClick={() => deleteIssue(issue.id)}
                >
                  {deletingId === issue.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Admindash;
