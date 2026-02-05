import { useEffect, useState } from "react";
import "./myissues.css";

function MyIssues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://issue-portal-b46v.onrender.com/view_my_issues/", {
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
        // ✅ MATCHES YOUR BACKEND
        setIssues(data.issues);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load issues");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading issues...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="issues-page">
      <h2>My Issues</h2>

      <div className="issues-grid">
        {issues.length === 0 ? (
          <p>No issues found</p>
        ) : (
          issues.map((issue) => (
            <div className="issue-card" key={issue.id}>
              <h3>{issue.title}</h3>
              <p>{issue.description}</p>
              <p>📍 {issue.location}</p>

              {issue.image && (
                <img src={issue.image} alt="issue" />
              )}

              <span>{issue.status}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyIssues;
