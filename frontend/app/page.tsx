import DatasetTable from "../components/DatasetTable";

export default function Home() {
  const sampleData = [
    { text: "I love this product!" },
    { text: "This is bad service." },
    { text: "Amazing experience overall." },
  ];

  return (
    <div>
      <DatasetTable data={sampleData} />
    </div>
  );
}