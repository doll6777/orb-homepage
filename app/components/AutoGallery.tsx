'use client';

import { useEffect, useRef } from 'react';

type GalleryImage = {
  number: string;
  src: string;
  alt: string;
  label: string;
};

export default function AutoGallery({
  images,
  ariaLabel,
}: {
  images: GalleryImage[];
  ariaLabel: string;
}) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const indexRef = useRef(0);

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion || images.length < 2) {
      return;
    }

    const interval = window.setInterval(() => {
      if (pausedRef.current) {
        return;
      }

      indexRef.current = (indexRef.current + 1) % images.length;
      const nextSlide = slider.children[indexRef.current] as HTMLElement | undefined;

      if (nextSlide) {
        slider.scrollTo({
          left: nextSlide.offsetLeft,
          behavior: 'smooth',
        });
      }
    }, 3600);

    return () => window.clearInterval(interval);
  }, [images.length]);

  return (
    <div
      className="space-slider"
      aria-label={ariaLabel}
      ref={sliderRef}
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      onPointerDown={() => {
        pausedRef.current = true;
      }}
      onPointerUp={() => {
        pausedRef.current = false;
      }}
      onFocus={() => {
        pausedRef.current = true;
      }}
      onBlur={() => {
        pausedRef.current = false;
      }}
    >
      {images.map((image) => (
        <figure className="gallery-slide" key={image.src}>
          <img src={image.src} alt={image.alt} />
          <figcaption>
            <span>{image.number}</span>
            <strong>{image.label}</strong>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
