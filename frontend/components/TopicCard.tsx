type Props = {
  topic: string;
  count: number;
};

export default function TopicCard({ topic, count }: Props) {
  return (
    <div className="p-4 rounded-xl border shadow-sm">
      <h3 className="font-semibold">{topic}</h3>
      <p>{count} Posts</p>
    </div>
  );
}