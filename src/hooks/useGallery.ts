import { useMemo, useState } from "react";

import type { Photo } from "@/types/photo";

export function useGallery(
  photos: Photo[]
) {
  const [search, setSearch] = useState("");

  const filteredPhotos = useMemo(() => {
    if (!search) return photos;

    const term = search.toLowerCase();

    return photos.filter((photo) =>
      photo.key.toLowerCase().includes(term)
    );
  }, [photos, search]);

  return {
    search,
    setSearch,
    filteredPhotos,
  };
}