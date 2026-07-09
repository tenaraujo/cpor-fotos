interface Props {
  title: string;
  description: string;
  totalPhotos: number;
}

export default function AlbumHeader({
  title,
  description,
  totalPhotos,
}: Props) {
  return (
    <div className="mb-12">

      <h1 className="text-5xl font-black text-[#1f2a1f]">
        {title}
      </h1>

      <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
        {description}
      </p>

      <div className="mt-8 flex flex-wrap gap-4">

        <div className="rounded-xl bg-white px-5 py-3 shadow">
          <span className="font-semibold">
            📷 {totalPhotos}
          </span>
          <span className="ml-2 text-gray-500">
            fotografias
          </span>
        </div>

      </div>

    </div>
  );
}