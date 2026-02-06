import { useEffect, useState } from "react";
import { getEvents } from "../services/eventsApi.js";

export default function useEvents() {
  const [events, setEvents] = useState([]);

  const refreshEvents = async () => {
    const data = await getEvents();
    setEvents(data);
  };

  useEffect(() => {
    refreshEvents();
  }, []);

  return { events, refreshEvents };
}
