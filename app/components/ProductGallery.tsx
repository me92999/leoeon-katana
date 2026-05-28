"use client";

import { useState } from "react";

function isRealImage(url?: string | null) {
  return !!url && url !== "/images/products/placeholder.jpg";
}

export default function ProductGallery({
  mainImage,
  imageAlt,
  gallery,
}: {
  mainImage: string;
  imageAlt?: string;
  gallery?: { url?: string; type?: string; alt?: string }[];
}) {
  const [selected, setSelected] = useState(0);

  const allImages = [
    { url: mainImage, alt: imageAlt || "Main product image", type: "main" },
    ...(gallery || []).filter((g) => g.url),
  ];

  const current = allImages[selected];
  const hasRealImages = allImages.some((img) => isRealImage(img.url));

  if (allImages.length === 0 || !hasRealImages) {
    return (
      <div className="relative aspect-[4/5] bg-dark-surface border border-dark-border flex items-center justify-center overflow-hidden">
        <div className="w-2 h-72 bg-gradient-to-b from-gold-light via-gold to-gold-dark rounded-full shadow-[0_0_80px_rgba(201,169,110,0.3)] rotate-12" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[4/5] bg-dark-surface border border-dark-border flex items-center justify-center overflow-hidden">
        {isRealImage(current?.url) ? (
          <img
            src={current.url}
            alt={current.alt || ""}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="w-2 h-72 bg-gradient-to-b from-gold-light via-gold to-gold-dark rounded-full shadow-[0_0_80px_rgba(201,169,110,0.3)] rotate-12" />
        )}
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`relative flex-shrink-0 w-20 h-20 border-2 overflow-hidden ${
                selected === i ? "border-gold" : "border-dark-border"
              }`}
            >
              {isRealImage(img.url) ? (
                <img
                  src={img.url}
                  alt={img.alt || ""}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-dark-surface">
                  <div className="w-1 h-10 bg-gradient-to-b from-gold-light via-gold to-gold-dark rounded-full rotate-12" />
                </div>
              )}
              {img.type && img.type !== "main" && (
                <span className="absolute bottom-0 left-0 right-0 bg-black/70 text-[9px] text-center text-white py-0.5 capitalize">
                  {img.type}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
