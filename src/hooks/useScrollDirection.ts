import { useCallback, useEffect, useRef, useState } from "react";

interface UseScrollDirectionOptions {
  threshold?: number;
  enabled?: boolean;
}

/**
 * Hook do śledzenia kierunku scrollowania i automatycznej zmiany indeksu
 * na podstawie pozycji scrolla w sekcji.
 * Podczas scrollowania w dół przyciski zmieniają się w dół,
 * podczas scrollowania w górę - w górę.
 */
export function useScrollDirection<T extends HTMLElement = HTMLDivElement>(
  itemCount: number,
  options: UseScrollDirectionOptions = {}
): {
  ref: React.RefObject<T | null>;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
} {
  const { threshold = 0.15, enabled = true } = options;
  const ref = useRef<T>(null);
  const [activeIndex, setActiveIndexState] = useState(0);
  const activeIndexRef = useRef(0);
  const lastScrollTop = useRef(0);
  const isUserControlled = useRef(false);
  const controlTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastUpdateTime = useRef(0);
  const scrollAccumulator = useRef(0); // Akumulator scrolla
  const lastTabChangeTime = useRef(0); // Czas ostatniej zmiany tabu

  // Synchronizuj ref z state
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const setActiveIndex = useCallback((index: number) => {
    isUserControlled.current = true;
    setActiveIndexState(index);
    activeIndexRef.current = index;
    
    if (controlTimeout.current) {
      clearTimeout(controlTimeout.current);
    }
    
    // Po 1.5 sekundy wróć do automatycznego sterowania
    controlTimeout.current = setTimeout(() => {
      isUserControlled.current = false;
    }, 1500);
  }, []);

  useEffect(() => {
    if (!enabled || !ref.current || itemCount === 0) return;

    const element = ref.current;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const checkIfInViewport = () => {
      const elementRect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      return (
        elementRect.top < viewportHeight &&
        elementRect.bottom > 0
      );
    };

    const handleScroll = () => {
      // Jeśli użytkownik kliknął przycisk, nie zmieniaj automatycznie przez chwilę
      if (isUserControlled.current) return;

      // Throttle updates (max 60fps)
      const now = Date.now();
      if (now - lastUpdateTime.current < 16) return;
      lastUpdateTime.current = now;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const elementRect = element.getBoundingClientRect();
      const elementTop = elementRect.top + scrollTop;
      const elementHeight = element.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Sprawdź czy sekcja jest w viewport
      const isInViewport = checkIfInViewport();

      if (!isInViewport) return;

      // Oblicz pozycję scrolla względem sekcji (0-1)
      // Używamy środka viewport jako punktu odniesienia
      const viewportCenter = scrollTop + viewportHeight / 2;
      // (wcześniej liczyliśmy tu scrollProgress 0-1, ale nie był używany)

      // Określ kierunek scrollowania
      const currentScrollTop = scrollTop;
      const scrollDirection = currentScrollTop > lastScrollTop.current ? "down" : "up";
      lastScrollTop.current = currentScrollTop;

      // Oblicz docelowy indeks na podstawie pozycji scrolla
      // Każdy feature zajmuje równą część sekcji
      const sectionHeight = elementHeight / itemCount;
      const currentSection = Math.floor((viewportCenter - elementTop) / sectionHeight);
      const targetIndex = Math.max(0, Math.min(itemCount - 1, currentSection));

      setActiveIndexState((prevIndex) => {
        let newIndex = prevIndex;
        
        // Jeśli scrollujemy w dół
        if (scrollDirection === "down") {
          // Sprawdź czy przekroczono próg dla następnego indeksu
          const nextSectionStart = elementTop + (targetIndex + 1) * sectionHeight;
          const distanceToNext = nextSectionStart - viewportCenter;
          
          if (distanceToNext < sectionHeight * threshold && prevIndex < targetIndex) {
            newIndex = Math.min(itemCount - 1, prevIndex + 1);
          }
          // Jeśli jesteśmy już w odpowiedniej sekcji, aktualizuj
          else if (targetIndex !== prevIndex && targetIndex > prevIndex) {
            newIndex = targetIndex;
          }
        } 
        // Jeśli scrollujemy w górę
        else if (scrollDirection === "up") {
          // Sprawdź czy przekroczono próg dla poprzedniego indeksu
          const currentSectionStart = elementTop + targetIndex * sectionHeight;
          const distanceFromStart = viewportCenter - currentSectionStart;
          
          if (distanceFromStart < sectionHeight * threshold && prevIndex > targetIndex) {
            newIndex = Math.max(0, prevIndex - 1);
          }
          // Jeśli jesteśmy już w odpowiedniej sekcji, aktualizuj
          else if (targetIndex !== prevIndex && targetIndex < prevIndex) {
            newIndex = targetIndex;
          }
        }
        
        // Zaktualizuj ref
        activeIndexRef.current = newIndex;
        return newIndex;
      });
    };

    // Handler dla wheel event - blokuje scrollowanie strony gdy sekcja jest na początku viewport
    const handleWheel = (e: WheelEvent) => {
      if (!checkIfInViewport()) {
        scrollAccumulator.current = 0; // Resetuj akumulator gdy sekcja nie jest widoczna
        return;
      }

      const currentActiveIndex = activeIndexRef.current;
      const elementRect = element.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const elementBottom = elementRect.bottom + scrollTop;
      const viewportBottom = scrollTop + window.innerHeight;
      
      // Sprawdź czy sekcja jest na początku viewport (górna krawędź sekcji jest na górze lub blisko góry)
      const isAtSectionStart = elementRect.top <= 50; // 50px marginesu od góry viewport
      const isAtSectionEnd = viewportBottom >= elementBottom - 50; // 50px marginesu od dołu sekcji

      // Jeśli sekcja nie jest na początku viewport, pozwól na normalny scroll strony
      if (!isAtSectionStart) {
        scrollAccumulator.current = 0; // Resetuj akumulator
        return;
      }

      // Jeśli sekcja jest na początku viewport, przechwytuj scroll
      // Jeśli jesteśmy na ostatnim tabie i scrollujemy w dół i jesteśmy na końcu sekcji
      if (currentActiveIndex === itemCount - 1 && e.deltaY > 0 && isAtSectionEnd) {
        scrollAccumulator.current = 0; // Resetuj akumulator
        return; // Pozwól na normalne scrollowanie strony w dół
      }

      // Jeśli jesteśmy na pierwszym tabie i scrollujemy w górę, pozwól scrollować stronę w górę
      if (currentActiveIndex === 0 && e.deltaY < 0) {
        scrollAccumulator.current = 0; // Resetuj akumulator
        return; // Pozwól na normalne scrollowanie strony w górę
      }

      // W przeciwnym razie blokuj scroll strony i akumuluj scroll dla zmiany tabów
      e.preventDefault();
      
      const now = Date.now();
      const MIN_SCROLL_DELTA = 100; // Minimalna wartość scrolla potrzebna do zmiany tabu
      const MIN_TIME_BETWEEN_CHANGES = 300; // Minimalny czas między zmianami tabów (ms)
      
      // Akumuluj scroll
      scrollAccumulator.current += Math.abs(e.deltaY);
      
      // Sprawdź czy minął wystarczający czas od ostatniej zmiany
      const timeSinceLastChange = now - lastTabChangeTime.current;
      if (timeSinceLastChange < MIN_TIME_BETWEEN_CHANGES) {
        return; // Zbyt szybko po ostatniej zmianie
      }
      
      // Sprawdź czy akumulowany scroll przekroczył próg
      if (scrollAccumulator.current < MIN_SCROLL_DELTA) {
        return; // Za mało scrolla, nie zmieniaj tabu
      }
      
      // Resetuj akumulator i zmień tab
      scrollAccumulator.current = 0;
      lastTabChangeTime.current = now;
      
      // Zmień tab w zależności od kierunku scrollowania
      if (e.deltaY > 0) {
        // Scroll w dół - zwiększ indeks
        setActiveIndexState((prev) => {
          const newIndex = Math.min(itemCount - 1, prev + 1);
          activeIndexRef.current = newIndex;
          return newIndex;
        });
      } else if (e.deltaY < 0) {
        // Scroll w górę - zmniejsz indeks
        setActiveIndexState((prev) => {
          const newIndex = Math.max(0, prev - 1);
          activeIndexRef.current = newIndex;
          return newIndex;
        });
      }
    };

    // Użyj throttling dla lepszej wydajności
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    // Wheel event musi być non-passive, żeby móc używać preventDefault
    window.addEventListener("wheel", handleWheel, { passive: false });

    // Inicjalizuj pozycję przy załadowaniu
    handleScroll();

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      window.removeEventListener("wheel", handleWheel);
      if (controlTimeout.current) {
        clearTimeout(controlTimeout.current);
      }
    };
  }, [itemCount, threshold, enabled]);

  return { ref, activeIndex, setActiveIndex };
}
