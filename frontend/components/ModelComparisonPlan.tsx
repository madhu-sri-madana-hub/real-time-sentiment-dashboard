export default function ModelComparisonPlan() {

  return (

    <div className="p-6 bg-gray-900 rounded-2xl text-white">

      <h2 className="text-3xl font-bold mb-6">
        NLP Model Comparison Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-gray-800 p-5 rounded-xl">
          <h3 className="text-xl font-semibold">
            VADER
          </h3>

          <p>Speed: Very Fast</p>
          <p>Accuracy: Medium</p>
          <p>CPU Usage: Low</p>
        </div>

        <div className="bg-gray-800 p-5 rounded-xl">
          <h3 className="text-xl font-semibold">
            DistilBERT
          </h3>

          <p>Speed: Medium</p>
          <p>Accuracy: High</p>
          <p>CPU Usage: Medium</p>
        </div>

        <div className="bg-gray-800 p-5 rounded-xl">
          <h3 className="text-xl font-semibold">
            RoBERTa
          </h3>

          <p>Speed: Slow</p>
          <p>Accuracy: Very High</p>
          <p>CPU Usage: High</p>
        </div>

      </div>

    </div>

  );

}