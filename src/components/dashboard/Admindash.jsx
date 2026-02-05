import { useEffect, useState } from "react";
import "./admindash.css";

function Admindash() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔹 FETCH ALL ISSUES (ADMIN)
  useEffect(() => {
    fetch("https://issue-portal-b46v.onrender.com/admin_view_all_issues/", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch issues");
        }
        return res.json();
      })
      .then((data) => {
        setIssues(data.issues || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load issues");
        setLoading(false);
      });
  }, []);

  // 🔹 UPDATE ISSUE STATUS (ADMIN)
  const updateStatus = (issueId, newStatus) => {
    const formData = new FormData();
    formData.append("status", newStatus);

    fetch(
      `https://issue-portal-b46v.onrender.com/admin_update_issue_status/${issueId}/`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Status update failed");
        }
        return res.json();
      })
      .then(() => {
        // Update UI instantly
        setIssues((prevIssues) =>
          prevIssues.map((issue) =>
            issue.id === issueId
              ? { ...issue, status: newStatus }
              : issue
          )
        );
      })
      .catch(() => {
        alert("Status update failed");
      });
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

              {/* 🔹 STATUS UPDATE BUTTONS */}
              <div className="actions">
                <button
                  className="btn pending"
                  disabled={issue.status === "pending"}
                  onClick={() => updateStatus(issue.id, "pending")}
                >
                  Pending
                </button>

                <button
                  className="btn in-progress"
                  disabled={issue.status === "in_progress"}
                  onClick={() => updateStatus(issue.id, "in_progress")}
                >
                  In Progress
                </button>

                <button
                  className="btn resolved"
                  disabled={issue.status === "resolved"}
                  onClick={() => updateStatus(issue.id, "resolved")}
                >
                  Resolved
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
