import ServiceCard from "../components/ServiceCard.jsx";

export default function Services() {
  return (
    <div>
      <h1>Campus Services</h1>
      <ServiceCard
        title="Cafeteria"
        info="Open 7AM – 8PM"
      />
      <ServiceCard
        title="Library"
        info="Open 8AM – 10PM"
      />
    </div>
  );
}
