import Header from "../components/layout/Header";
import AlbumCard from "../components/ui/AlbumCard";
import { albums } from "../data/albums";

export default function Home() {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-7xl p-8">

        {albums.map((group) => (

          <section
            key={group.id}
            className="mb-12"
          >

            <h2 className="mb-6 text-3xl font-bold">

              {group.title}

            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {group.items.map((album) => (

                <AlbumCard
                  key={album.id}
                  title={album.name}
                />

              ))}

            </div>

          </section>

        ))}

      </main>
    </>
  );
}