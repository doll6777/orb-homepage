'use client';

import { useEffect } from 'react';

export default function SiteMotion() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const root = document.documentElement;
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.snap-section'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.toggleAttribute('data-inview', entry.isIntersecting);
        });
      },
      {
        threshold: 0.38,
      },
    );

    sections.forEach((section) => observer.observe(section));

    const handlePointerMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5).toFixed(3);
      const y = (event.clientY / window.innerHeight - 0.5).toFixed(3);

      root.style.setProperty('--pointer-x', x);
      root.style.setProperty('--pointer-y', y);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      root.style.removeProperty('--pointer-x');
      root.style.removeProperty('--pointer-y');
    };
  }, []);

  return null;
}
