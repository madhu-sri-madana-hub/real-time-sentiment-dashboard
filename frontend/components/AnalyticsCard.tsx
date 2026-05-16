export default function AnalyticsCard({ title, value }) {
  return (
    <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg hover:scale-105 transition">
      <h2>{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}