"use client";

import DatasetTable from "@/components/DatasetTable";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from "recharts";

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

  const sentimentData = [
    { name: "Positive", value: 1240 },
    { name: "Negative", value: 420 },
    { name: "Neutral", value: 310 },
  ];

  const barData = [
    { day: "Mon", posts: 120 },
    { day: "Tue", posts: 210 },
    { day: "Wed", posts: 180 },
    { day: "Thu", posts: 260 },
    { day: "Fri", posts: 320 },
  ];

  const lineData = [
    { day: "Mon", positive: 120, negative: 40 },
    { day: "Tue", positive: 180, negative: 60 },
    { day: "Wed", positive: 150, negative: 55 },
    { day: "Thu", positive: 240, negative: 70 },
    { day: "Fri", positive: 300, negative: 90 },
  ];

  const COLORS = ["#10b981", "#ef4444", "#64748b"];

  return (

    <div className="min-h-screen flex bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">

      {/* SIDEBAR */}
      <div className="w-64 bg-black/40 backdrop-blur-md border-r border-gray-800 p-6 hidden lg:block">

        <h2 className="text-3xl font-bold mb-10">
          AI Monitor
        </h2>

        <nav className="space-y-4">

          <div className="bg-blue-600 p-3 rounded-xl cursor-pointer hover:bg-blue-500 transition-all duration-300 shadow-lg">
            Dashboard
          </div>

          <div className="bg-gray-900 border border-gray-800 p-3 rounded-xl cursor-pointer hover:bg-gray-800 transition-all duration-300">
            Analytics
          </div>

          <div className="bg-gray-900 border border-gray-800 p-3 rounded-xl cursor-pointer hover:bg-gray-800 transition-all duration-300">
            Trends
          </div>

          <div className="bg-gray-900 border border-gray-800 p-3 rounded-xl cursor-pointer hover:bg-gray-800 transition-all duration-300">
            Live Feed
          </div>

          <div className="bg-gray-900 border border-gray-800 p-3 rounded-xl cursor-pointer hover:bg-gray-800 transition-all duration-300">
            Settings
          </div>

        </nav>

      </div>

      {/* PAGE CONTAINER */}
      <div className="flex-1 p-8">

        {/* HEADER */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold tracking-wide mb-2">
            Sentiment Dashboard
          </h1>

          <p className="text-gray-400 text-lg">
            Real-Time Social Media Brand Monitoring
          </p>

        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

          {/* POSITIVE */}
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-6 rounded-3xl shadow-2xl hover:scale-105 transition-all duration-300">

            <h2 className="text-lg font-semibold text-white/80">
              Total Positive
            </h2>

            <p className="text-4xl font-bold mt-4">
              1,240
            </p>

          </div>

          {/* NEGATIVE */}
          <div className="bg-gradient-to-br from-rose-500 to-red-700 p-6 rounded-3xl shadow-2xl hover:scale-105 transition-all duration-300">

            <h2 className="text-lg font-semibold text-white/80">
              Total Negative
            </h2>

            <p className="text-4xl font-bold mt-4">
              420
            </p>

          </div>

          {/* NEUTRAL */}
          <div className="bg-gradient-to-br from-slate-500 to-slate-700 p-6 rounded-3xl shadow-2xl hover:scale-105 transition-all duration-300">

            <h2 className="text-lg font-semibold text-white/80">
              Total Neutral
            </h2>

            <p className="text-4xl font-bold mt-4">
              310
            </p>

          </div>

          {/* CONFIDENCE */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-700 p-6 rounded-3xl shadow-2xl hover:scale-105 transition-all duration-300">

            <h2 className="text-lg font-semibold text-white/80">
              Average Confidence
            </h2>

            <p className="text-4xl font-bold mt-4">
              92%
            </p>

          </div>

        </div>

        {/* CHART SECTION */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">

          {/* PIE CHART */}
          <div className="bg-gray-900/80 border border-gray-800 backdrop-blur-md p-6 rounded-3xl shadow-2xl">

            <h2 className="text-2xl font-bold mb-6">
              Sentiment Distribution
            </h2>

            <div className="h-80">

              <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label
                  >

                    {sentimentData.map((entry, index) => (

                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />

                    ))}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* BAR CHART */}
          <div className="bg-gray-900/80 border border-gray-800 backdrop-blur-md p-6 rounded-3xl shadow-2xl">

            <h2 className="text-2xl font-bold mb-6">
              Weekly Activity
            </h2>

            <div className="h-80">

              <ResponsiveContainer width="100%" height="100%">

                <BarChart data={barData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="day" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="posts"
                    fill="#3b82f6"
                    radius={[10, 10, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* LINE CHART */}
          <div className="xl:col-span-2 bg-gray-900/80 border border-gray-800 backdrop-blur-md p-6 rounded-3xl shadow-2xl">

            <h2 className="text-2xl font-bold mb-6">
              Sentiment Trend Analysis
            </h2>

            <div className="h-96">

              <ResponsiveContainer width="100%" height="100%">

                <LineChart data={lineData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="day" />

                  <YAxis />

                  <Tooltip />

                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="positive"
                    stroke="#10b981"
                    strokeWidth={3}
                  />

                  <Line
                    type="monotone"
                    dataKey="negative"
                    stroke="#ef4444"
                    strokeWidth={3}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

        {/* LATEST POSTS */}
        <div className="bg-gray-900/80 border border-gray-800 backdrop-blur-md p-6 rounded-3xl shadow-2xl mb-10">

          <h2 className="text-2xl font-bold mb-6">
            Latest Posts
          </h2>

          <div className="space-y-4">

            <div className="bg-gray-800 p-4 rounded-xl hover:bg-gray-700 transition-all duration-300">
              Amazing dashboard performance update 🚀
            </div>

            <div className="bg-gray-800 p-4 rounded-xl hover:bg-gray-700 transition-all duration-300">
              AI analytics charts look incredible.
            </div>

            <div className="bg-gray-800 p-4 rounded-xl hover:bg-gray-700 transition-all duration-300">
              Negative sentiment dropped by 12%.
            </div>

          </div>

        </div>

        {/* DASHBOARD SECTIONS */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">

          {/* TRENDING TOPICS */}
          <div className="bg-gray-900/80 border border-gray-800 backdrop-blur-md p-6 rounded-3xl shadow-2xl">

            <h2 className="text-2xl font-bold mb-6">
              Trending Topics
            </h2>

            <div className="flex flex-wrap gap-4">

              <span className="bg-cyan-600 px-4 py-2 rounded-full">
                #AI
              </span>

              <span className="bg-purple-600 px-4 py-2 rounded-full">
                #Dashboard
              </span>

              <span className="bg-emerald-600 px-4 py-2 rounded-full">
                #Analytics
              </span>

              <span className="bg-rose-600 px-4 py-2 rounded-full">
                #Performance
              </span>

              <span className="bg-yellow-600 px-4 py-2 rounded-full">
                #UIUX
              </span>

            </div>

          </div>

          {/* LIVE ACTIVITY */}
          <div className="bg-gray-900/80 border border-gray-800 backdrop-blur-md p-6 rounded-3xl shadow-2xl">

            <h2 className="text-2xl font-bold mb-6">
              Live Activity
            </h2>

            <div className="space-y-4">

              <div className="bg-gray-800 p-4 rounded-xl hover:bg-gray-700 transition-all duration-300">
                Positive sentiment spike detected
              </div>

              <div className="bg-gray-800 p-4 rounded-xl hover:bg-gray-700 transition-all duration-300">
                New Reddit dataset processed
              </div>

              <div className="bg-gray-800 p-4 rounded-xl hover:bg-gray-700 transition-all duration-300">
                Trending topic updated: AI Analytics
              </div>

            </div>

          </div>

        </div>

        {/* DATASET TABLE */}
        <DatasetTable data={sampleData} />

      </div>

    </div>

  );

}