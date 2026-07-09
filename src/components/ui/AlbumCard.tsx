interface Props {
  title: string;
}

export default function AlbumCard({ title }: Props) {
  return (
    <button
      className="
        w-full
        rounded-xl
        border
        border-gray-300
        bg-white
        p-6
        text-left
        shadow
        transition
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <h3 className="text-lg font-semibold">
        {title}
      </h3>
    </button>
  );
}