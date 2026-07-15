import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  ImagePlus,
  Trash2,
  Trash,
} from "lucide-react";

interface Props {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function Dropzone({
  files,
  setFiles,
}: Props) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles((current) => [
        ...current,
        ...acceptedFiles,
      ]);
    },
    [setFiles]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: true,
  });

  function remove(index: number) {
    setFiles((current) =>
      current.filter((_, i) => i !== index)
    );
  }

  function clearAll() {
    setFiles([]);
  }

  return (
    <div>
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition ${
          isDragActive
            ? "border-yellow-600 bg-yellow-50"
            : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />

        <ImagePlus
          size={46}
          className="mx-auto text-yellow-600"
        />

        <h3 className="mt-5 text-xl font-bold">
          Arraste as fotografias aqui
        </h3>

        <p className="mt-2 text-gray-500">
          ou clique para selecionar
        </p>
      </div>

      {files.length > 0 && (
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-semibold text-gray-700">
              {files.length} fotografia(s)
              selecionada(s)
            </span>

            <button
              type="button"
              onClick={clearAll}
              className="flex items-center gap-2 text-sm font-medium text-red-600 transition hover:text-red-700"
            >
              <Trash size={16} />
              Remover todas
            </button>
          </div>

          <div className="max-h-72 space-y-3 overflow-y-auto pr-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between rounded-xl border p-4"
              >
                <div className="min-w-0">
                  <p className="truncate font-semibold">
                    {file.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(
                      2
                    )}{" "}
                    MB
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="ml-4"
                >
                  <Trash2 className="text-red-500 transition hover:text-red-700" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}