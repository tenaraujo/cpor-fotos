import { useEffect, useState } from "react";

import { getPhotos } from "@/services/photos";
import type { Photo } from "@/types/photo";

export function useAlbum(
  albumPath?: string
) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadPhotos() {
    if (!albumPath) {
      setLoading(false);
      return;
    }

    try {
      const result = await getPhotos(albumPath);

      setPhotos(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPhotos();
  }, [albumPath]);

  return {
    photos,
    loading,
    reload: loadPhotos,
  };
}