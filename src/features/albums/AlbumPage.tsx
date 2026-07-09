import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Camera, ChevronLeft } from "lucide-react";

import { albums } from "./albums";
import Gallery from "./Gallery";

import { getPhotos, type Photo } from "@/services/photos";
import UploadDialog from "@/features/upload/UploadDialog";

export default function AlbumPage() {
  const { groupId, albumId } = useParams();

  const group = albums.find((g) => g.id === groupId);
  const album = group?.items.find((a) => a.id === albumId);

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadOpen, setUploadOpen] = useState(false);

  async function loadPhotos() {
    if (!album) {
      setLoading(false);
      return;
    }

    try {
      const result = await getPhotos(album.path);
      setPhotos(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPhotos();
  }, [album]);

  if (!group || !album) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-4xl font-bold">
          Álbum não encontrado
        </h1>

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 text-yellow-700 hover:text-yellow-600"
        >
          <ChevronLeft size={18} />
          Voltar ao início
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-100">

      <section className="bg-[#1f2a1f] py-16 text-white">

        <div className="mx-auto max-w-6xl px-6">

          <Link
            to={`/albums/${group.id}`}
            className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300"
          >
            <ChevronLeft size={18} />
            {group.title}
          </Link>

          <h1 className="mt-8 text-5xl font-black">
            {album.name}
          </h1>

          <p className="mt-5 max-w-3xl text-lg text-gray-300">
            {album.description}
          </p>

        </div>

      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">

        {loading && (
          <p className="text-center text-lg text-gray-500">
            Carregando fotografias...
          </p>
        )}

        {!loading && photos.length === 0 && (

          <div className="rounded-3xl bg-white p-16 text-center shadow">

            <Camera
              size={72}
              className="mx-auto text-gray-400"
            />

            <h2 className="mt-8 text-3xl font-bold text-[#1f2a1f]">
              Este álbum ainda está vazio
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
              Seja o primeiro integrante da Turma Marechal Waldemar Levy
              Cardoso a compartilhar uma lembrança deste momento.
            </p>

            <button
              onClick={() => setUploadOpen(true)}
              className="mt-10 rounded-full bg-yellow-600 px-8 py-4 font-semibold text-white transition hover:bg-yellow-500"
            >
              Enviar Fotografias
            </button>

          </div>

        )}

        {!loading && photos.length > 0 && (
          <>
            <div className="mb-8 flex items-center justify-between">

              <span className="text-gray-600">
                {photos.length} fotografia(s)
              </span>

              <button
                onClick={() => setUploadOpen(true)}
                className="rounded-full bg-yellow-600 px-6 py-3 font-semibold text-white transition hover:bg-yellow-500"
              >
                Enviar Fotografias
              </button>

            </div>

            <Gallery photos={photos} />
          </>
        )}

      </section>

      <UploadDialog
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onUploaded={loadPhotos}
        prefix={album.path}
      />

    </main>
  );
}