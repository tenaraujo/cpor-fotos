interface Props {
  progress: number;
}

export default function UploadProgress({
  progress,
}: Props) {
  return (
    <div className="mt-6">

      <div className="mb-2 flex justify-between text-sm text-gray-600">

        <span>Enviando fotografias...</span>

        <span>{progress}%</span>

      </div>

      <div className="h-3 overflow-hidden rounded-full bg-gray-200">

        <div
          className="h-full rounded-full bg-yellow-600 transition-all duration-300"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

    </div>
  );
}