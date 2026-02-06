import BASE_URL from "./API.js";

export const getEvents = async () => {
  const res = await fetch(`${BASE_URL}/events`);
  return res.json();
};

export const createEvent = async (eventData) => {
  const res = await fetch(`${BASE_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });
  if (!res.ok) {
    throw new Error("Failed to create event");
  }
  return res.json();
};
