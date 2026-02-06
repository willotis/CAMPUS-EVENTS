import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";

export default function Home() {
    return (
        <div className="home-container">
            <section className="hero">
                <h1>Welcome to Campus Events</h1>
                <p>Your hub for campus activities, events, and services</p>
                <div className="cta-buttons">
                    <Link to="/events" className="btn btn-primary">
                        Browse Events
                    </Link>
                    <Link to="/services" className="btn btn-secondary">
                        View Services
                    </Link>
                </div>
            </section>

            <section className="features">
                <div className="feature-card">
                    <h3> Campus Events</h3>
                    <p>Stay updated with all the latest campus events and activities</p>
                </div>
                <div className="feature-card">
                    <h3> Student Services</h3>
                    <p>Access essential campus services and facilities information</p>
                </div>
                <div className="feature-card">
                    <h3> Community</h3>
                    <p>Connect with fellow students and join campus communities</p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
