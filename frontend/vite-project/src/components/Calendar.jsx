import { useState } from "react";

export default function Calendar({ events = [], onDateClick }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Get first day of month and total days
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday

    // Month names
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Navigate months
    const previousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    // Get events for a specific date
    const getEventsForDate = (day) => {
        const dateStr = new Date(year, month, day).toDateString();
        return events.filter(event => {
            const eventDate = new Date(event.date).toDateString();
            return eventDate === dateStr;
        });
    };

    // Check if date is today
    const isToday = (day) => {
        const today = new Date();
        return (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        );
    };

    // Generate calendar days
    const calendarDays = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
        calendarDays.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayEvents = getEventsForDate(day);
        const isCurrentDay = isToday(day);

        calendarDays.push(
            <div
                key={day}
                className={`calendar-day ${isCurrentDay ? 'today' : ''} ${dayEvents.length > 0 ? 'has-events' : ''}`}
                onClick={() => onDateClick && onDateClick(new Date(year, month, day))}
            >
                <div className="day-number">{day}</div>
                <div className="day-events">
                    {dayEvents.slice(0, 3).map((event, idx) => (
                        <div
                            key={event._id || idx}
                            className="event-indicator"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedEvent(event);
                            }}
                            title={event.title}
                        >
                            {event.title}
                        </div>
                    ))}
                    {dayEvents.length > 3 && (
                        <div className="event-more">+{dayEvents.length - 3} more</div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button onClick={previousMonth} className="nav-btn">
                    ← Previous
                </button>
                <h2>{monthNames[month]} {year}</h2>
                <button onClick={nextMonth} className="nav-btn">
                    Next →
                </button>
            </div>

            <div className="calendar-grid">
                <div className="calendar-weekday">Sun</div>
                <div className="calendar-weekday">Mon</div>
                <div className="calendar-weekday">Tue</div>
                <div className="calendar-weekday">Wed</div>
                <div className="calendar-weekday">Thu</div>
                <div className="calendar-weekday">Fri</div>
                <div className="calendar-weekday">Sat</div>
                {calendarDays}
            </div>

            {selectedEvent && (
                <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedEvent(null)}>
                            ×
                        </button>
                        {selectedEvent.imageUrl && (
                            <div className="event-modal-image">
                                <img src={selectedEvent.imageUrl} alt={selectedEvent.title} />
                            </div>
                        )}
                        <h3>{selectedEvent.title}</h3>
                        <p className="event-date">
                            📅 {new Date(selectedEvent.date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                        {selectedEvent.location && (
                            <p className="event-location">📍 {selectedEvent.location}</p>
                        )}
                        {selectedEvent.description && (
                            <p className="event-description">{selectedEvent.description}</p>
                        )}
                        {selectedEvent.organizer && (
                            <p className="event-organizer">Organized by: {selectedEvent.organizer}</p>
                        )}
                        {selectedEvent.category && (
                            <p className="event-category">Category: {selectedEvent.category}</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
