interface Props {
  total: number;
}

export default function AlbumToolbar({
  total,
}: Props) {
  return (
    <div className="mb-8 flex items-center justify-between">

      <span className="text-gray-600">
        {total} fotografia(s)
      </span>

      <div className="flex gap-3">

        <button className="rounded-xl border px-4 py-2 hover:bg-gray-100">
          ⬜ Grade
        </button>

        <button className="rounded-xl border px-4 py-2 hover:bg-gray-100">
          📅 Linha do tempo
        </button>

      </div>

    </div>
  );
}