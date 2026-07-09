import type { IconName } from "../constants/icons";

export interface AlbumItem {
  id: string;

  name: string;

  path: string;

  cover?: string;

  description?: string;

  icon: IconName;

  photos: number;
}

export interface AlbumGroup {
  id: string;

  title: string;

  description?: string;

  cover?: string;

  icon: IconName;

  items: AlbumItem[];
}