'use client'; // Required for client-side interactivity in Next.js 13+

import { useState } from "react";

export default function AboutPage() {
  const [showContact, setShowContact] = useState(false);

  const sectionStyle = {
    marginBottom: "40px", // increased spacing between sections
  };

  const headingStyle = {
    color: "#00695c",
    fontSize: "1.6em",
    marginBottom: "10px",
  };

  const paragraphStyle = {
    margin: 0,
  };

  const containerStyle = {
    maxWidth: "960px",
    margin: "50px auto",
    padding: "50px", // increased padding inside container
    backgroundColor: "#ffffff",
    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
    borderRadius: "10px",
    color: "#2e3d49",
    lineHeight: "1.8", // slightly increased line height
    fontFamily: "Segoe UI, sans-serif",
  };

  const titleStyle = {
    textAlign: "center",
    color: "#00796b",
    marginBottom: "40px",
    fontSize: "2.8em",
  };

  const contactStyle = {
    textAlign: "center",
    marginTop: "60px", // more space above contact section
  };

  const buttonStyle = {
    display: "inline-block",
    marginTop: "15px", // more space above button
    padding: "12px 25px",
    backgroundColor: "#00796b",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
  };

  const Section = ({ title, content }) => (
    <div style={sectionStyle}>
      <h2 style={headingStyle}>{title}</h2>
      <p style={paragraphStyle}>{content}</p>
    </div>
  );

  const ContactSection = () => (
    <div style={{ marginTop: "30px", textAlign: "center" }}>
      <h2 style={headingStyle}>Contact Us</h2>
      <p>Email: contact@coastalsentinel.org</p>
      <p>Phone: +1 (555) 123-4567</p>
      <p>Address: 123 Ocean View Blvd, Seaville, CA 90210</p>
    </div>
  );

  return (
    <main style={{ backgroundColor: "#e0f7fa", minHeight: "100vh", padding: "20px" }}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>Our Mission</h1>

        <Section
          title="Protecting Coastal Communities"
          content="Coastal Sentinel is a team of scientists, engineers, and data experts on a mission to safeguard coastal life. We build tools that detect threats in real time—before they escalate—giving communities and ecosystems a critical head start."
        />
        <Section
          title="Nature-Based Resilience"
          content="We focus on Blue Carbon ecosystems—mangroves, seagrasses, and salt marshes—that naturally defend our coasts and store vast amounts of carbon. These ecosystems are nature’s first line of defense against climate change."
        />
        <Section
          title="Why It Matters"
          content="Coastal regions are under threat—from rising sea levels to increasingly severe storms. Without proactive systems, millions remain vulnerable. Our platform turns environmental signals into actionable alerts, helping people prepare and adapt."
        />
        <Section
          title="Built on Data, Guided by Nature"
          content="We combine satellite sensing, oceanographic data, and AI forecasting to monitor both natural systems and environmental risks. Our alerts don’t just warn—they empower communities to act faster and smarter."
        />
        <Section
          title="Mapping Blue Carbon"
          content="We continuously map and assess the health of Blue Carbon zones. This data powers our threat models and reinforces the link between ecosystem conservation and long-term coastal safety."
        />
        <Section
          title="Collaborative by Design"
          content="We partner with research institutions, NGOs, and climate agencies to make this work possible. These collaborations amplify our reach and ensure our platform aligns with the needs of vulnerable communities."
        />
        <Section
          title="Our Promise"
          content="We are committed to a resilient, climate-ready coastline—where communities thrive and ecosystems endure. Through innovation and integrity, we work toward a future that values both people and planet."
        />

        <div style={contactStyle}>
          <p>Want to collaborate or learn more?</p>
          <button style={buttonStyle} onClick={() => setShowContact(!showContact)}>
            {showContact ? "Hide Contact Info" : "Get in Touch"}
          </button>
        </div>

        {showContact && <ContactSection />}
      </div>
    </main>
  );
}
