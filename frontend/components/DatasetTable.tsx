export default function DatasetTable({ data }: { data: any[] }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Dataset</h2>

      <div className="space-y-2">
        {data?.map((item, index) => (
          <div key={index} className="p-2 border rounded">
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}