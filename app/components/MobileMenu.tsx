'use client';

import { useEffect, useRef, type ReactNode } from 'react';

export default function MobileMenu({ children }: { children: ReactNode }) {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const menu = menuRef.current;
    const summary = summaryRef.current;

    if (!menu || !summary) {
      return;
    }

    const mobileViewport = window.matchMedia('(max-width: 980px)');
    const closeMenu = (restoreFocus = false) => {
      if (!menu.open) {
        return;
      }

      const focusWasInside = menu.contains(document.activeElement);
      menu.open = false;

      if (restoreFocus && focusWasInside) {
        summary.focus({ preventScroll: true });
      }
    };

    const handleLinkClick = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest('nav a')) {
        // Keep native link navigation, including fragments and new tabs.
        closeMenu(true);
      }
    };

    const handleOutsidePointer = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        (event.target === menu || !menu.contains(event.target))
      ) {
        // The existing ::before backdrop reports the details element as its target.
        closeMenu(true);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menu.open) {
        event.preventDefault();
        closeMenu(true);
      }
    };

    const handleFocusOut = (event: FocusEvent) => {
      if (event.relatedTarget instanceof Node && !menu.contains(event.relatedTarget)) {
        closeMenu();
      }
    };

    const handleViewportChange = () => {
      if (mobileViewport.matches) {
        return;
      }

      const activeElement = document.activeElement;
      const focusWasInside = menu.contains(activeElement);
      closeMenu();

      if (focusWasInside) {
        const header = menu.closest('header');
        const href = activeElement?.getAttribute('href');
        const desktopLink = Array.from(
          header?.querySelectorAll<HTMLAnchorElement>('.primary-nav a') ?? [],
        ).find((link) => link.getAttribute('href') === href);
        const nextFocus = desktopLink ?? header?.querySelector<HTMLAnchorElement>('.wordmark');
        nextFocus?.focus({ preventScroll: true });
      }
    };

    menu.addEventListener('click', handleLinkClick);
    menu.addEventListener('focusout', handleFocusOut);
    document.addEventListener('pointerdown', handleOutsidePointer, true);
    document.addEventListener('keydown', handleEscape);
    mobileViewport.addEventListener('change', handleViewportChange);
    handleViewportChange();

    return () => {
      menu.removeEventListener('click', handleLinkClick);
      menu.removeEventListener('focusout', handleFocusOut);
      document.removeEventListener('pointerdown', handleOutsidePointer, true);
      document.removeEventListener('keydown', handleEscape);
      mobileViewport.removeEventListener('change', handleViewportChange);
    };
  }, []);

  return (
    <details className="mobile-menu" ref={menuRef}>
      <summary ref={summaryRef}>MENU</summary>
      <nav aria-label="모바일 메뉴">{children}</nav>
    </details>
  );
}
