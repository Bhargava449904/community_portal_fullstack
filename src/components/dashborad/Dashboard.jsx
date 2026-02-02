// 


import React, { useState } from "react";
import "../dashborad/Dashboard.css";

import Login from "../auth/Login";
import Register from "../auth/Register";

import communityImg from "../../../src/assets/community.jpg";
import roadImg from "../../../src/assets/roads.jpg";
import waterImg from "../../../src/assets/OIP.jpg";
import garbageImg from "../../../src/assets/garbage.jpg";
import lightImg from "../../../src/assets/light.jpg";

export function Dashboard() {
    const [showModal, setShowModal] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    return (
        <div className="home">
            {/* Navbar */}
            <header className="navbar">
                <h3>Community Issue Portal</h3>
                <div className="nav-links">
                    <a href="#">Campaigns</a>
                    <a href="#">Events</a>
                    <a href="#">Groups</a>
                    <a href="#">People</a>
                    <button
                        className="login-btn"
                        onClick={() => {
                            setShowModal(true);
                            setShowRegister(false);
                        }}
                    >
                        Login / Sign Up
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-left">
                    <div className="image-wrapper">
                        <img src={communityImg} alt="Community" />
                    </div>
                </div>

                <div className="hero-right">
                    <h1>
                        Welcome to <br /> the Community Portal
                    </h1>
                    <p>
                        Help make your community better by reporting issues, collaborating
                        with others, and tracking real progress together.
                    </p>
                    <button
                        className="cta-btn"
                        onClick={() => {
                            setShowModal(true);
                            setShowRegister(false);
                        }}
                    >
                        Get Started
                    </button>
                </div>
            </section>

            {/* Report Cards Section */}
            <section className="report-section">
                <h2 className="section-title">Report an Issue</h2>

                <div className="card-container">
                    <div className="issue-card">
                        <img src={roadImg} alt="Road Issues" />
                        <h3>Road Issues</h3>
                        <p>Report potholes, damaged roads, or unsafe streets.</p>
                    </div>

                    <div className="issue-card">
                        <img src={waterImg} alt="Water Issues" />
                        <h3>Water Problems</h3>
                        <p>Water leakage, drainage problems, or no supply.</p>
                    </div>

                    <div className="issue-card">
                        <img src={garbageImg} alt="Garbage Issues" />
                        <h3>Garbage & Waste</h3>
                        <p>Overflowing dustbins or irregular garbage collection.</p>
                    </div>

                    <div className="issue-card">
                        <img src={lightImg} alt="Street Light Issues" />
                        <h3>Street Lights</h3>
                        <p>Broken or non-working street lights in public areas.</p>
                    </div>
                </div>
            </section>

            {/* Modal (JSX only) */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <button
                            className="close-btn"
                            onClick={() => setShowModal(false)}
                        >
                            X
                        </button>
                        {showRegister ? (
                            <Register onSwitchToLogin={() => setShowRegister(false)} />
                        ) : (
                            <Login onSwitchToRegister={() => setShowRegister(true)} />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
