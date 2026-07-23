import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type TouchEvent,
} from "react";
import { Icon } from "@iconify/react";
import { resultsData } from "../data/results";

const AUTOPLAY_DELAY = 5000;
const SWIPE_THRESHOLD = 50;
const MOBILE_BREAKPOINT = 800;

const ResultsCarousel = () => {
  const [resultsPerSlide, setResultsPerSlide] = useState(() =>
    window.innerWidth <= MOBILE_BREAKPOINT ? 1 : 2,
  );

  const [currentSlide, setCurrentSlide] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const carouselRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);

    const handleBreakpointChange = (
      event: MediaQueryListEvent | MediaQueryList,
    ) => {
      setResultsPerSlide(event.matches ? 1 : 2);
    };

    handleBreakpointChange(mediaQuery);

    mediaQuery.addEventListener("change", handleBreakpointChange);

    return () => {
      mediaQuery.removeEventListener("change", handleBreakpointChange);
    };
  }, []);

  const slides = useMemo(() => {
    const groupedResults = [];

    for (let i = 0; i < resultsData.length; i += resultsPerSlide) {
      groupedResults.push(resultsData.slice(i, i + resultsPerSlide));
    }

    return groupedResults;
  }, [resultsPerSlide]);

  const carouselSlides = useMemo(() => {
    if (slides.length === 0) return [];

    return [slides[slides.length - 1], ...slides, slides[0]];
  }, [slides]);

  const totalSlides = slides.length;

  const activeSlide =
    totalSlides > 0 ? (currentSlide - 1 + totalSlides) % totalSlides : 0;

  useEffect(() => {
    setTransitionEnabled(false);
    setIsAnimating(false);
    setCurrentSlide(1);
  }, [resultsPerSlide]);

  const goToNextSlide = useCallback(() => {
    if (isAnimating || totalSlides <= 1) return;

    setTransitionEnabled(true);
    setIsAnimating(true);
    setCurrentSlide((previousSlide) => previousSlide + 1);
  }, [isAnimating, totalSlides]);

  const goToPreviousSlide = useCallback(() => {
    if (isAnimating || totalSlides <= 1) return;

    setTransitionEnabled(true);
    setIsAnimating(true);
    setCurrentSlide((previousSlide) => previousSlide - 1);
  }, [isAnimating, totalSlides]);

  const goToSlide = useCallback(
    (slideIndex: number) => {
      if (isAnimating || slideIndex === activeSlide) return;

      setTransitionEnabled(true);
      setIsAnimating(true);
      setCurrentSlide(slideIndex + 1);
    },
    [activeSlide, isAnimating],
  );

  const handleTransitionEnd = () => {
    if (currentSlide === carouselSlides.length - 1) {
      setTransitionEnabled(false);
      setCurrentSlide(1);
    } else if (currentSlide === 0) {
      setTransitionEnabled(false);
      setCurrentSlide(totalSlides);
    }

    setIsAnimating(false);
  };

  useEffect(() => {
    if (!transitionEnabled) {
      const firstFrame = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setTransitionEnabled(true);
        });
      });

      return () => window.cancelAnimationFrame(firstFrame);
    }
  }, [transitionEnabled]);

  useEffect(() => {
    if (isPaused || isAnimating || totalSlides <= 1) return;

    const interval = window.setInterval(() => {
      goToNextSlide();
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(interval);
  }, [goToNextSlide, isAnimating, isPaused, totalSlides]);

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNextSlide();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPreviousSlide();
      }

      if (event.key === "Home") {
        event.preventDefault();
        goToSlide(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        goToSlide(totalSlides - 1);
      }
    };

    carousel.addEventListener("keydown", handleKeyDown);

    return () => {
      carousel.removeEventListener("keydown", handleKeyDown);
    };
  }, [goToNextSlide, goToPreviousSlide, goToSlide, totalSlides]);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.targetTouches[0].clientX;
    touchEndX.current = null;
    setIsPaused(true);
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    touchEndX.current = event.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) {
      setIsPaused(false);
      return;
    }

    const swipeDistance = touchStartX.current - touchEndX.current;

    if (swipeDistance > SWIPE_THRESHOLD) {
      goToNextSlide();
    } else if (swipeDistance < -SWIPE_THRESHOLD) {
      goToPreviousSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
    setIsPaused(false);
  };

  if (totalSlides === 0) return null;

  return (
    <section
      ref={carouselRef}
      className="results-carousel"
      aria-label="Patient smile results"
      aria-roledescription="carousel"
      tabIndex={0}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div
        className="results-carousel__viewport"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="results-carousel__track"
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
            transition: transitionEnabled ? "transform 1.5s ease" : "none",
          }}
        >
          {carouselSlides.map((slide, slideIndex) => {
            const realSlideIndex = (slideIndex - 1 + totalSlides) % totalSlides;

            return (
              <div
                className="results-carousel-slide"
                key={`${slideIndex}-${slide[0]?.id}`}
                aria-hidden={activeSlide !== realSlideIndex}
                aria-label={`Results slide ${
                  realSlideIndex + 1
                } of ${totalSlides}`}
              >
                {slide.map((result) => (
                  <article className="result-card" key={result.id}>
                    <div className="result-card-before">
                      <img src={result.beforeimg} alt={result.beforealt} />

                      <span className="descriptor">
                        Before {result.service}
                      </span>
                    </div>

                    <div className="result-card-after">
                      <img src={result.afterimg} alt={result.afteralt} />

                      <span className="descriptor">After {result.service}</span>
                    </div>
                  </article>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {totalSlides > 1 && (
        <>
          <button
            type="button"
            className="results-carousel-arrow previous"
            onClick={goToPreviousSlide}
            aria-label="Show previous results"
            disabled={isAnimating}
          >
            <Icon
              icon="ion:chevron-forward-outline"
              rotate={2}
              className="icon"
            />
          </button>

          <button
            type="button"
            className="results-carousel-arrow next"
            onClick={goToNextSlide}
            aria-label="Show next results"
            disabled={isAnimating}
          >
            <Icon icon="ion:chevron-forward-outline" className="icon" />
          </button>

          <div
            className="results-carousel__dots"
            aria-label="Choose results slide"
          >
            {slides.map((_, slideIndex) => (
              <button
                type="button"
                key={slideIndex}
                className={`results-carousel__dot ${
                  activeSlide === slideIndex
                    ? "results-carousel__dot--active"
                    : ""
                }`}
                onClick={() => goToSlide(slideIndex)}
                aria-label={`Go to results slide ${slideIndex + 1}`}
                aria-current={activeSlide === slideIndex ? "true" : undefined}
                disabled={isAnimating}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default ResultsCarousel;
