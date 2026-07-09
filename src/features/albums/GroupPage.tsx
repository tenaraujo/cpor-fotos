import { Link, useParams } from "react-router-dom";
import { ChevronLeft, Images } from "lucide-react";

import { albums } from "./albums";

export default function GroupPage() {
  const { groupId } = useParams();

  const group = albums.find((g) => g.id === groupId);

  if (!group) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-4xl font-bold">Grupo não encontrado</h1>

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

      {/* Hero */}
      <section className="bg-[#1f2a1f] py-16 text-white">

        <div className="mx-auto max-w-6xl px-6">

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300"
          >
            <ChevronLeft size={18} />
            Início
          </Link>

          <h1 className="mt-8 text-5xl font-black">
            {group.title}
          </h1>

          <p className="mt-5 max-w-3xl text-lg text-gray-300">
            {group.description}
          </p>

        </div>

      </section>

      {/* Álbuns */}
      <section className="mx-auto max-w-6xl px-6 py-16">

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {group.items.map((item) => (

            <Link
              key={item.id}
              to={`/albums/${group.id}/${item.id}`}
              className="group rounded-2xl bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="flex items-center justify-between">

                <Images
                  size={34}
                  className="text-yellow-600 transition group-hover:scale-110"
                />

                <span className="rounded-full bg-stone-100 px-3 py-1 text-sm text-gray-600">
                  {item.photos} fotos
                </span>

              </div>

              <h2 className="mt-8 text-3xl font-bold text-[#1f2a1f]">
                {item.name}
              </h2>

              <p className="mt-4 min-h-[56px] text-gray-600">
                {item.description}
              </p>

              <div className="mt-10 flex items-center justify-between">

                <span className="text-sm text-gray-500">
                  Clique para abrir
                </span>

                <span className="font-semibold text-yellow-700 transition group-hover:translate-x-1">
                  Abrir →
                </span>

              </div>

            </Link>

          ))}

        </div>

      </section>

    </main>
  );
}