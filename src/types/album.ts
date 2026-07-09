export interface Album {
  id: string;
  name: string;
  path: string;
  description: string;
  cover: string;
  icon: string;
  photos: number;
}

export interface AlbumGroup {
  id: string;
  title: string;
  description: string;
  icon: string;
  cover: string;
  items: Album[];
}