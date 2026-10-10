'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import ResponsiveImage from './ResponsiveImage';

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
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];
  const progress = useMemo(() => {
    if (images.length < 2) {
      return 100;
    }

    return ((activeIndex + 1) / images.length) * 100;
  }, [activeIndex, images.length]);

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

    let frame = 0;

    const setNearestSlide = () => {
      const slides = Array.from(slider.children) as HTMLElement[];
      const nextIndex = slides.reduce((nearestIndex, slide, index) => {
        const currentDistance = Math.abs(slide.offsetLeft - slider.scrollLeft);
        const nearestSlide = slides[nearestIndex];
        const nearestDistance = Math.abs(nearestSlide.offsetLeft - slider.scrollLeft);

        return currentDistance < nearestDistance ? index : nearestIndex;
      }, 0);

      setActiveIndex(nextIndex);
    };

    const interval = window.setInterval(() => {
      if (pausedRef.current) {
        return;
      }

      const slides = Array.from(slider.children) as HTMLElement[];
      const nextIndex = (activeIndexRef(slider, slides) + 1) % images.length;
      const nextSlide = slides[nextIndex];

      if (nextSlide) {
        setActiveIndex(nextIndex);
        slider.scrollTo({
          left: Math.max(0, nextSlide.offsetLeft - slider.clientWidth * 0.08),
          behavior: 'smooth',
        });
      }
    }, 4100);

    const handleScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(setNearestSlide);
    };

    slider.addEventListener('scroll', handleScroll, { passive: true });
    setNearestSlide();

    return () => {
      window.clearInterval(interval);
      window.cancelAnimationFrame(frame);
      slider.removeEventListener('scroll', handleScroll);
    };
  }, [images.length]);

  return (
    <div className="space-observer">
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
        {images.map((image, index) => (
          <figure className="gallery-slide" key={image.src}>
            <ResponsiveImage src={image.src} alt={image.alt} sizes="(max-width: 980px) 84vw, (max-width: 1618px) 1100px, 68vw" />
            <figcaption>
              <span>{image.number}</span>
              <strong>{image.label}</strong>
            </figcaption>
            <i aria-hidden="true">{String(index + 1).padStart(2, '0')}</i>
          </figure>
        ))}
      </div>
      <div className="space-progress" aria-hidden="true">
        <span>{activeImage?.number}</span>
        <b>{activeImage?.label}</b>
        <i>
          <em style={{ width: `${progress}%` }} />
        </i>
      </div>
    </div>
  );
}

function activeIndexRef(slider: HTMLElement, slides: HTMLElement[]) {
  return slides.reduce((nearestIndex, slide, index) => {
    const currentDistance = Math.abs(slide.offsetLeft - slider.scrollLeft);
    const nearestSlide = slides[nearestIndex];
    const nearestDistance = Math.abs(nearestSlide.offsetLeft - slider.scrollLeft);

    return currentDistance < nearestDistance ? index : nearestIndex;
  }, 0);
}
