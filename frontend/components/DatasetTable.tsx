"use client";

import { useState } from "react";

interface DataItem {
  text: string;
  sentiment?: string;
  confidence_score?: number;
}

export default function DatasetTable({
  data,
}: {
  data: DataItem[];
}) {

  const [search, setSearch] = useState("");

  // SEARCH FILTER
  const filteredData = data.filter((item) =>
    item.text.toLowerCase().includes(search.toLowerCase())
  );

  // BADGE COLORS
  const getBadgeColor = (sentiment: string) => {

    if (sentiment === "Positive") {
      return "bg-green-500";
    }

    if (sentiment === "Negative") {
      return "bg-red-500";
    }

    return "bg-gray-500";
  };

  return (

    <div className="bg-gray-900 p-6 rounded-2xl shadow-2xl">

      {/* TITLE */}
      <h2 className="text-2xl font-bold text-white mb-6">
        Dataset Analysis
      </h2>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 outline-none"
      />

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl">

        <table className="w-full text-left text-white">

          {/* HEADER */}
          <thead className="bg-gray-800 sticky top-0">

            <tr>

              <th className="p-4">Post</th>

              <th className="p-4">Sentiment</th>

              <th className="p-4">Confidence</th>

            </tr>

          </thead>

          {/* BODY */}
          <tbody>

            {filteredData.map((item, index) => (

              <tr
                key={index}
                className={`border-b border-gray-700 hover:bg-gray-800 transition ${
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
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getBadgeColor(
                      item.sentiment || "Neutral"
                    )}`}
                  >
                    {item.sentiment || "Neutral"}
                  </span>

                </td>

                {/* CONFIDENCE */}
                <td className="p-4 font-semibold">

                  {Number(item.confidence_score || 0).toFixed(2)}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* EMPTY STATE */}
      {filteredData.length === 0 && (

        <div className="text-center text-gray-400 mt-6">
          No matching posts found.
        </div>

      )}

    </div>

  );
}