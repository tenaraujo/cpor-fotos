import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Camera, ChevronLeft } from "lucide-react";

import { albums } from "./albums";
import { getPhotos, type Photo } from "@/services/photos";

export default function AlbumPage() {
  const { groupId, albumId } = useParams();

  const group = albums.find((g) => g.id === groupId);
  const album = group?.items.find((a) => a.id === albumId);

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!album) return;

      try {
        const result = await getPhotos(album.path);
        setPhotos(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [album]);

  if (!group || !album) {
    return (
      <main className="mx-auto max-w-5xl p-10">
        <h1 className="text-4xl font-bold">
          Álbum não encontrado
        </h1>

        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 text-yellow-700"
        >
          <ChevronLeft size={18} />
          Voltar
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
            className="inline-flex items-center gap-2 text-yellow-400"
          >
            <ChevronLeft size={18} />
            {group.title}
          </Link>

          <h1 className="mt-8 text-5xl font-black">
            {album.name}
          </h1>

          <p className="mt-6 max-w-3xl text-lg text-gray-300">
            {album.description}
          </p>

        </div>

      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">

        {loading && (

          <p className="text-center text-gray-500">
            Carregando fotografias...
          </p>

        )}

        {!loading && photos.length === 0 && (

          <div className="rounded-3xl bg-white p-16 text-center shadow">

            <Camera
              size={72}
              className="mx-auto text-gray-400"
            />

            <h2 className="mt-8 text-3xl font-bold">
              Ainda não há fotografias
            </h2>

            <p className="mt-6 text-gray-600">
              Seja o primeiro integrante da turma a compartilhar uma lembrança deste álbum.
            </p>

            <button
              className="mt-10 rounded-full bg-yellow-600 px-8 py-4 font-semibold text-white hover:bg-yellow-500"
            >
              Enviar Fotografias
            </button>

          </div>

        )}

        {!loading && photos.length > 0 && (

          <div className="grid gap-6 md:grid-cols-3">

            {photos.map((photo) => (

              <img
                key={photo.key}
                src={photo.url}
                alt={photo.key}
                className="aspect-square rounded-xl object-cover shadow"
              />

            ))}

          </div>

        )}

      </section>

    </main>
  );
}