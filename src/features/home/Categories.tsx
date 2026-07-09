import { Link } from "react-router-dom";
import { FolderOpen, ArrowRight } from "lucide-react";

import { albums } from "@/features/albums/albums";

export default function Categories() {
  return (
    <section
      id="categories"
      className="bg-stone-100 py-24"
    >
      <div className="mx-auto max-w-screen-2xl px-8">

        {/* Cabeçalho */}

        <div className="mb-16 text-center">

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-yellow-700">
            MEMÓRIAS
          </p>

          <h2 className="text-4xl font-black text-[#1f2a1f] md:text-5xl">
            Passe pelos portões mais uma vez.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            Escolha um caminho e reviva os momentos que marcaram a{" "}
            <span className="font-semibold text-[#1f2a1f]">
              Turma Marechal Waldemar Levy Cardoso.
            </span>
          </p>

        </div>

        {/* Cards */}

        <div className="grid gap-8 lg:grid-cols-3">

          {albums.map((group) => (

            <Link
              key={group.id}
              to={`/albums/${group.id}`}
              className="group overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
            >

              {/* Área da imagem */}

              <div className="flex h-48 items-center justify-center bg-gradient-to-br from-[#315438] via-[#2B4734] to-[#1D2735]">

                <FolderOpen
                  size={60}
                  className="text-white/90 transition-transform duration-300 group-hover:scale-110"
                />

              </div>

              {/* Conteúdo */}

              <div className="p-8">

                <h3 className="text-3xl font-bold text-[#1f2a1f]">

                  {group.title}

                </h3>

                <p className="mt-5 min-h-[80px] leading-7 text-gray-600">

                  {group.id === "basico" &&
                    "Reviva os momentos da formação militar ao lado dos seis pelotões da turma."}

                  {group.id === "aqs" &&
                    "Explore os registros das especialidades que marcaram a trajetória de cada aspirante."}

                  {group.id === "reencontros" &&
                    "Os encontros que mantêm viva a amizade construída em 2012."}

                </p>

                <div className="mt-8 flex items-center justify-between">

                  <div className="flex items-center gap-2 text-gray-500">

                    <FolderOpen size={18} />

                    <span>

                      {group.items.length}{" "}

                      {group.items.length === 1
                        ? "álbum"
                        : "álbuns"}

                    </span>

                  </div>

                  <div className="flex items-center gap-2 font-semibold text-yellow-700">

                    Explorar

                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />

                  </div>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>
    </section>
  );
}