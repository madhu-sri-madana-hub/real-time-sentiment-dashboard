"use client";

import DatasetTable from "@/components/DatasetTable";

export default function Home() {

  const sampleData = [

    {
      text: "I love this dashboard! Amazing UI.",
      sentiment: "Positive",
      confidence_score: 0.92,
    },

    {
      text: "This update is terrible.",
      sentiment: "Negative",
      confidence_score: 0.87,
    },

    {
      text: "The app is okay for now.",
      sentiment: "Neutral",
      confidence_score: 0.50,
    },

  ];

  return (

    <div className="min-h-screen bg-black p-10">

      <DatasetTable data={sampleData} />

    </div>

  );
}