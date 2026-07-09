import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ImagePlus, Trash2 } from "lucide-react";

interface Props {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function Dropzone({
  files,
  setFiles,
}: Props) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((current) => [...current, ...acceptedFiles]);
  }, [setFiles]);

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

  return (
    <div>

      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition

        ${
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

        <div className="mt-8 space-y-3">

          {files.map((file, index) => (

            <div
              key={index}
              className="flex items-center justify-between rounded-xl border p-4"
            >

              <div>

                <p className="font-semibold">
                  {file.name}
                </p>

                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>

              </div>

              <button
                onClick={() => remove(index)}
              >
                <Trash2 className="text-red-500" />
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}