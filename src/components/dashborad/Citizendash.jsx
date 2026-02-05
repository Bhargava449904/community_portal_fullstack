import React, { useState } from "react";

function CitizenDash() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("location", location);
      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(
        "https://issue-portal-b46v.onrender.com/create_issue/",
        {
          method: "POST",
          body: formData,
          credentials: "include", // IMPORTANT
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to create issue");
        return;
      }

      setSuccess("Issue created successfully ✅");

      // clear form
      setTitle("");
      setDescription("");
      setLocation("");
      setImage(null);

    } catch (err) {
      console.error(err);
      setError("Server not responding");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto" }}>
      <h2>Citizen Dashboard</h2>
      <p>Create a new issue</p>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Issue title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Issue description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit">Create Issue</button>
      </form>
    </div>
  );
}

export default CitizenDash;
