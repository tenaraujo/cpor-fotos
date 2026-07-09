import { useState } from "react";
import { PhotoView } from "react-photo-view";

import type { Photo } from "@/services/photos";

interface Props {
  photo: Photo;
}

export default function PhotoCard({
  photo,
}: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <PhotoView src={photo.url}>

      <div className="group relative mb-5 cursor-pointer break-inside-avoid overflow-hidden rounded-2xl">

        {!loaded && (

          <div className="absolute inset-0 animate-pulse rounded-2xl bg-gray-200" />

        )}

        <img
          src={photo.url}
          alt={photo.key}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`
            w-full
            rounded-2xl
            transition-all
            duration-500
            group-hover:scale-[1.02]
            group-hover:shadow-2xl
            ${loaded ? "opacity-100" : "opacity-0"}
          `}
        />

      </div>

    </PhotoView>
  );
}