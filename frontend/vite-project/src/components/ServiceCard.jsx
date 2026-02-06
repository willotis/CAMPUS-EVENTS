export default function ServiceCard({ title, info }) {
    return (
        <div className="service-card">
            <h3>{title}</h3>
            <p>{info}</p>
        </div>
    );
}
