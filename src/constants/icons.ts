import {
  CalendarDays,
  GraduationCap,
  Shield,
  Swords,
  Users,
  Image,
  Folder,
  Camera,
  Landmark,
} from "lucide-react";

export const icons = {
  basico: GraduationCap,

  armas: Swords,

  pelotao: Shield,

  album: Image,

  eventos: CalendarDays,

  integrantes: Users,

  folder: Folder,

  camera: Camera,

  historia: Landmark,
} as const;

export type IconName = keyof typeof icons;