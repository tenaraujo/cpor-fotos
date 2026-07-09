import { Camera, FolderOpen, Users } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "174",
    label: "Aspirantes",
  },
  {
    icon: Camera,
    value: "0",
    label: "Fotos",
  },
  {
    icon: FolderOpen,
    value: "14",
    label: "Álbuns",
  },
];

export default function Stats() {
  return (
    <section className="bg-[#1f2a1f] text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-10 md:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="flex items-center justify-center gap-4 text-center"
            >
              <Icon className="h-12 w-12 text-yellow-400" />

              <div>
                <p className="text-3xl font-bold">{item.value}</p>
                <p className="text-gray-300">{item.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}