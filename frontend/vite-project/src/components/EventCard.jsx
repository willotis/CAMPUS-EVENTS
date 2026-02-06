export default function EventCard({ event }) {
    return (
        <div className="event-card">
            {event.imageUrl && (
                <div className="event-card-image">
                    <img src={event.imageUrl} alt={event.title} />
                </div>
            )}
            <h3>{event.title}</h3>
            <p className="event-date">
                {new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}
            </p>
            <p className="event-location">📍 {event.location}</p>
            <p className="event-description">{event.description}</p>
            {event.organizer && (
                <p className="event-organizer">Organized by: {event.organizer}</p>
            )}
        </div>
    );
}
