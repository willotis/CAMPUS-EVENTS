import { useState } from "react";
import useEvents from "../hooks/useEvents.js";
import Calendar from "../components/Calendar.jsx";
import EventFormModal from "../components/EventFormModal.jsx";
import { createEvent } from "../services/eventsApi.js";

export default function Events() {
  const { events, refreshEvents } = useEvents();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (date) => {
    if (isAdmin) {
      // Format date to YYYY-MM-DD for the form
      const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
        .toISOString()
        .split('T')[0];
      setSelectedDate(localDate);
      setIsModalOpen(true);
    }
  };

  const handleFormSubmit = async (eventData) => {
    await createEvent(eventData);
    await refreshEvents();
  };

  return (
    <div className="events-page">
      <div className="events-header">
        <h1>Campus Events</h1>
        <div className="admin-toggle">
          <label>
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            Admin Mode
          </label>
        </div>
      </div>

      <div className="admin-notice">
        {isAdmin ? (
          <p className="admin-hint"> Admin Mode Active: Click any day on the calendar to create a new event.</p>
        ) : (
          <p className="viewer-hint">Viewing campus events. Enable Admin Mode to add new events.</p>
        )}
      </div>

      <Calendar
        events={events}
        onDateClick={handleDateClick}
      />

      <EventFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        selectedDate={selectedDate}
      />
    </div>
  );
}
