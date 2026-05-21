import DatasetTable from "../components/DatasetTable";

export default function Home() {

  const sampleData = [

    {
      text: "I love this dashboard! Amazing UI.",
      sentiment: "Positive",
      confidence_score: 0.92,
      topic_id: 0,
      topic_name: "Dashboard / Performance / Looks",
    },

    {
      text: "This update is terrible.",
      sentiment: "Negative",
      confidence_score: 0.87,
      topic_id: 1,
      topic_name: "Charts / Detection / Feature",
    },

    {
      text: "The app is okay for now.",
      sentiment: "Neutral",
      confidence_score: 0.50,
      topic_id: 0,
      topic_name: "Dashboard / Performance / Looks",
    },

    {
      text: "Topic detection works perfectly.",
      sentiment: "Positive",
      confidence_score: 0.96,
      topic_id: 1,
      topic_name: "Charts / Detection / Feature",
    },

  ];

  return (
    <div className="p-8 bg-black min-h-screen">
      <DatasetTable data={sampleData} />
    </div>
  );
}