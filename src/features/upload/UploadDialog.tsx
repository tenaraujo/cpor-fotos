import { useState } from "react";

import Dropzone from "./Dropzone";
import UploadProgress from "./UploadProgress";

import { uploadPhotos } from "@/services/upload";

interface Props {
  open: boolean;
  prefix: string;
  onClose: () => void;
  onUploaded: () => Promise<void> | void;
}

export default function UploadDialog({
  open,
  prefix,
  onClose,
  onUploaded,
}: Props) {
  const [password, setPassword] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  if (!open) return null;

  async function handleUpload() {
    try {
      setUploading(true);
      setProgress(0);

      const timer = setInterval(() => {
        setProgress((value) => {
          if (value >= 90) return value;
          return value + 10;
        });
      }, 150);

      await uploadPhotos({
        password,
        prefix,
        files,
      });

      clearInterval(timer);

      setProgress(100);
      setSuccess(true);

      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      setPassword("");
      setFiles([]);
      setSuccess(false);
      setProgress(0);

      await onUploaded();

      onClose();
    } catch (error) {
      setProgress(0);

      alert(
        error instanceof Error
          ? error.message
          : "Erro ao enviar fotografias."
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

      <div className="flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* Cabeçalho */}

        <div className="border-b p-8">

          <h2 className="text-3xl font-black">
            Enviar Fotografias
          </h2>

          <p className="mt-3 text-gray-600">
            Compartilhe suas lembranças da turma.
          </p>

        </div>

        {/* Conteúdo */}

        <div className="flex-1 overflow-y-auto p-8">

          {!success && (
            <>
              <div>

                <label className="font-semibold">
                  Senha da turma
                </label>

                <input
                  disabled={uploading}
                  type="password"
                  placeholder="Digite a senha"
                  className="mt-2 w-full rounded-xl border p-3 disabled:bg-gray-100"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

              </div>

              <div
                className={`mt-8 ${
                  uploading
                    ? "pointer-events-none opacity-60"
                    : ""
                }`}
              >

                <Dropzone
                  files={files}
                  setFiles={setFiles}
                />

              </div>
            </>
          )}

          {uploading && (
            <UploadProgress
              progress={progress}
            />
          )}

          {success && (
            <div className="rounded-2xl bg-green-50 p-8 text-center">

              <h3 className="text-2xl font-bold text-green-700">
                ✅ Upload concluído!
              </h3>

              <p className="mt-3 text-green-600">
                {files.length} fotografia(s)
                enviada(s) com sucesso.
              </p>

            </div>
          )}

        </div>

        {/* Rodapé */}

        {!success && (

          <div className="flex items-center justify-between border-t bg-white p-6">

            <span className="text-sm text-gray-500">
              {files.length} fotografia(s)
              selecionada(s)
            </span>

            <div className="flex gap-3">

              <button
                disabled={uploading}
                onClick={onClose}
                className="rounded-xl border px-6 py-3 disabled:opacity-40"
              >
                Cancelar
              </button>

              <button
                disabled={
                  uploading ||
                  !password ||
                  files.length === 0
                }
                onClick={handleUpload}
                className="rounded-xl bg-yellow-600 px-6 py-3 font-semibold text-white disabled:opacity-40"
              >
                {uploading
                  ? "Enviando..."
                  : `Enviar ${files.length} fotografia(s)`}
              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}