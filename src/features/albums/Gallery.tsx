import {
  PhotoProvider,
} from "react-photo-view";

import "react-photo-view/dist/react-photo-view.css";

import type { Photo } from "@/services/photos";

import PhotoCard from "./PhotoCard";

interface GalleryProps {
  photos: Photo[];
}

export default function Gallery({
  photos,
}: GalleryProps) {
  return (
    <PhotoProvider>

      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">

        {photos.map((photo) => (

          <PhotoCard
            key={photo.key}
            photo={photo}
          />

        ))}

      </div>

    </PhotoProvider>
  );
}