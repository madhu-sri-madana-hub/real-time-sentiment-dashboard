type Props = {
  topic: string;
};

export default function TopicBadge({ topic }: Props) {
  return (
    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
      {topic}
    </span>
  );
}