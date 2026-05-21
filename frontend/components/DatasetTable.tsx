"use client";

import { useEffect, useState } from "react";

interface DataItem {
  text: string;
  sentiment?: string;
  confidence_score?: number;
  topic_id?: number;
  topic_name?: string;
}

export default function DatasetTable({ data }: { data: DataItem[] }) {

  // ---------------- STATES ----------------
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("high");
  const [filter, setFilter] = useState("All");
  const [topics, setTopics] = useState<string[]>(["All"]);
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
 
  const rowsPerPage = 5;

  // ---------------- LOADING SIMULATION ----------------
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);

  }, []);
   useEffect(() => {
  fetch("http://localhost:8000/topics")
    .then((res) => res.json())
    .then((data) => {
      setTopics([
        "All",
        ...data.map((t: any) => t.topic_name),
      ]);
    })
    .catch((err) => {
      console.error(
        "Failed to load topics:",
        err
      );
    });
}, []);


  // ---------------- LOADING UI ----------------
  if (loading) {
    return (
      <div className="text-center text-white p-10">
        Loading data...
      </div>
    );
  }

  // ---------------- EMPTY STATE ----------------
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-white p-10">
        <p>No data found.</p>

        <button className="mt-4 px-4 py-2 bg-red-500 rounded">
          Retry
        </button>
      </div>
    );
  }

  

  // ---------------- SEARCH + FILTER ----------------
  const filteredData = data.filter((item) => {

    const matchesSearch =
      item.text.toLowerCase().includes(
        search.toLowerCase()
      );

    const matchesFilter =
      filter === "All" ||
      item.sentiment === filter;

    const matchesTopic =
      selectedTopic === "All" ||
      item.topic_name === selectedTopic;

    return (
      matchesSearch &&
      matchesFilter &&
      matchesTopic
    );
  });

  // ---------------- SORTING ----------------
  const sortedData = [...filteredData].sort((a, b) => {

    if (sortOrder === "high") {
      return (
        (b.confidence_score || 0) -
        (a.confidence_score || 0)
      );
    }

    return (
      (a.confidence_score || 0) -
      (b.confidence_score || 0)
    );
  });

  // ---------------- PAGINATION ----------------
  const indexOfLastRow =
    currentPage * rowsPerPage;

  const indexOfFirstRow =
    indexOfLastRow - rowsPerPage;

  const currentRows = sortedData.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  // ---------------- BADGE COLORS ----------------
 const getBadgeColor = (sentiment: string) => {
  if (sentiment === "Positive") return "bg-green-500";
  if (sentiment === "Negative") return "bg-red-500";
  return "bg-gray-500";
};

const getTopicColor = (topic: string) => {

  if (topic.includes("Dashboard"))
    return "bg-blue-500/20 text-blue-300 border border-blue-500/30";

  if (topic.includes("Charts"))
    return "bg-purple-500/20 text-purple-300 border border-purple-500/30";

  return "bg-slate-700 text-white";
};

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-2xl">

      {/* TITLE */}
      <h2 className="text-2xl font-bold text-white mb-6">
        Dataset Analysis
      </h2>

      {/* SENTIMENT FILTERS */}
      <div className="flex gap-2 mb-6 p-1 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-xl w-fit">

        {/* ALL */}
        <button
          onClick={() => setFilter("All")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            filter === "All"
              ? "bg-slate-100 text-slate-900 shadow-md"
              : "text-slate-300 hover:text-white hover:bg-slate-800"
          }`}
        >
          All
        </button>

        {/* POSITIVE */}
        <button
          onClick={() => setFilter("Positive")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            filter === "Positive"
              ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
              : "text-emerald-300 hover:text-white hover:bg-emerald-500/10"
          }`}
        >
          Positive
        </button>

        {/* NEGATIVE */}
        <button
          onClick={() => setFilter("Negative")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            filter === "Negative"
              ? "bg-rose-500 text-white shadow-md shadow-rose-500/20"
              : "text-rose-300 hover:text-white hover:bg-rose-500/10"
          }`}
        >
          Negative
        </button>

        {/* NEUTRAL */}
        <button
          onClick={() => setFilter("Neutral")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            filter === "Neutral"
              ? "bg-slate-500 text-white shadow-md shadow-slate-500/20"
              : "text-slate-300 hover:text-white hover:bg-slate-700"
          }`}
        >
          Neutral
        </button>

      </div>

      {/* TOPIC FILTERS */}
<div className="flex flex-wrap gap-3 mb-6">

  {topics.map((topic) => (

    <button
      key={topic}
      onClick={() => setSelectedTopic(topic)}

      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 ${
        selectedTopic === topic
          ? getTopicColor(topic)
          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
      }`}
    >
      {topic}
    </button>

  ))}

</div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full mb-4 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 outline-none"
      />

      {/* SORT */}
      <select
        onChange={(e) =>
          setSortOrder(e.target.value)
        }
        className="bg-gray-800 text-white p-2 rounded mb-4"
      >
        <option value="high">
          High Confidence
        </option>

        <option value="low">
          Low Confidence
        </option>
      </select>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl">

        <table className="w-full text-left text-white">

          {/* HEADER */}
          <thead className="bg-gray-800 sticky top-0 z-10">

            <tr>
              <th className="p-4">Post</th>

              <th className="p-4">
                Sentiment
              </th>

              <th className="p-4">
                Confidence
              </th>

              <th className="p-4">
                Topic
              </th>
            </tr>

          </thead>

          {/* BODY */}
          <tbody>

            {currentRows.map((item, index) => (

              <tr
                key={index}
                className={`border-b border-gray-700 transition hover:bg-gray-800 ${
                  index % 2 === 0
                    ? "bg-gray-900"
                    : "bg-gray-950"
                }`}
              >

                {/* TEXT */}
                <td className="p-4">
                  {item.text}
                </td>

                {/* SENTIMENT */}
                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold transition-transform hover:scale-105 animate-pulse ${getBadgeColor(
                      item.sentiment || "Neutral"
                    )}`}
                  >
                    {item.sentiment || "Neutral"}
                  </span>

                </td>

                {/* CONFIDENCE */}
                <td className="p-4 font-semibold">

                  {Number(
                    item.confidence_score || 0
                  ).toFixed(2)}

                </td>

                {/* TOPIC */}
                <td className="p-4">

                  <span
  className={`px-3 py-1 rounded-full text-xs font-semibold ${getTopicColor(
    item.topic_name || "Unknown"
  )}`}
>

                    {item.topic_name || "Unknown"}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 mt-6">

        <button
          onClick={() =>
            setCurrentPage((p) =>
              Math.max(p - 1, 1)
            )
          }
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 rounded"
        >
          Previous
        </button>

        <button
          onClick={() =>
            setCurrentPage((p) => p + 1)
          }
          disabled={
            indexOfLastRow >= sortedData.length
          }
          className="px-4 py-2 bg-gray-700 rounded"
        >
          Next
        </button>

      </div>

      {/* EMPTY FILTER STATE */}
      {sortedData.length === 0 && (

        <div className="text-center text-gray-400 mt-6">

          No matching posts found.

        </div>

      )}

    </div>
  );
} 