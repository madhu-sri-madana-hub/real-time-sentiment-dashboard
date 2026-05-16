"use client";

import { useEffect, useState } from "react";
import AnalyticsCard from "@/components/AnalyticsCard";

export default function Dashboard() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">

      {/* HEADER */}
      <div className="text-white mb-6">

        <h1 className="text-3xl font-bold">
          Sentiment Dashboard
        </h1>

        <p className="text-gray-300 text-sm mt-2">
          Current Time: {time}
        </p>

        <div className="flex gap-3 mt-3 flex-wrap">

          <span className="px-3 py-1 bg-green-500 rounded-full text-sm">
            Model: VADER
          </span>

          <span className="px-3 py-1 bg-blue-500 rounded-full text-sm">
            Dataset: Active
          </span>

          <span className="px-3 py-1 bg-purple-500 rounded-full text-sm">
            Status: Ready
          </span>

        </div>

      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <AnalyticsCard title="Positive Posts" value="120" />
        <AnalyticsCard title="Neutral Posts" value="45" />
        <AnalyticsCard title="Negative Posts" value="30" />
        <AnalyticsCard title="Avg Confidence" value="0.82" />

      </div>

    </div>
  );
}