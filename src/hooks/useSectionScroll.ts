import { useEffect, useRef, useCallback } from 'react';

export function useSectionScroll() {
  const isScrolling = useRef(false);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const accumulatedDelta = useRef(0);

  const getCurrentSectionIndex = useCallback(() => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.body.scrollHeight;

    // If at footer area (past last section), return sections.length to indicate footer
    if (scrollTop + windowHeight >= docHeight - 100) {
      return sectionsRef.current.length;
    }

    let currentIndex = 0;
    sectionsRef.current.forEach((section, index) => {
      if (scrollTop >= section.offsetTop - windowHeight / 3) {
        currentIndex = index;
      }
    });
    return currentIndex;
  }, []);

  const scrollToSection = useCallback((index: number) => {
    const sections = sectionsRef.current;
    if (isScrolling.current) return;

    // Allow scrolling past last section to footer
    if (index < 0) return;

    if (index >= sections.length) {
      // Scroll to bottom of page (footer)
      isScrolling.current = true;
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
      setTimeout(() => {
        isScrolling.current = false;
        accumulatedDelta.current = 0;
      }, 700);
      return;
    }

    isScrolling.current = true;

    const targetSection = sections[index];
    const targetTop = targetSection.offsetTop;

    window.scrollTo({
      top: targetTop,
      behavior: 'smooth',
    });

    setTimeout(() => {
      isScrolling.current = false;
      accumulatedDelta.current = 0;
    }, 700);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-section]');
    sectionsRef.current = Array.from(sections);

    if (sections.length === 0) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isScrolling.current) return;

      // Accumulate delta for smoother detection
      accumulatedDelta.current += e.deltaY;

      const threshold = 50;

      if (accumulatedDelta.current > threshold) {
        scrollToSection(getCurrentSectionIndex() + 1);
      } else if (accumulatedDelta.current < -threshold) {
        scrollToSection(getCurrentSectionIndex() - 1);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling.current) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        scrollToSection(getCurrentSectionIndex() + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        scrollToSection(getCurrentSectionIndex() - 1);
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling.current) return;

      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;

      if (diff > 30) {
        scrollToSection(getCurrentSectionIndex() + 1);
      } else if (diff < -30) {
        scrollToSection(getCurrentSectionIndex() - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollToSection, getCurrentSectionIndex]);

  return { scrollToSection };
}
