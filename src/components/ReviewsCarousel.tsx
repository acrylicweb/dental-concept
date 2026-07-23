import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type TouchEvent,
} from "react";
import { Icon } from "@iconify/react";
import { reviewsData } from "../data/reviews";

const AUTOPLAY_DELAY = 15000;
const SWIPE_THRESHOLD = 50;

const getReviewsPerSlide = () => {
  if (typeof window === "undefined") return 3;

  if (window.innerWidth <= 560) return 1;
  if (window.innerWidth <= 1024) return 2;

  return 3;
};

const ReviewsCarousel = () => {
  const [reviewsPerSlide, setReviewsPerSlide] = useState(getReviewsPerSlide);

  const [currentSlide, setCurrentSlide] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const carouselRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const newReviewsPerSlide = getReviewsPerSlide();

      setReviewsPerSlide((currentValue) => {
        if (currentValue === newReviewsPerSlide) {
          return currentValue;
        }

        return newReviewsPerSlide;
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const slides = useMemo(() => {
    const groupedReviews: (typeof reviewsData)[] = [];

    for (let index = 0; index < reviewsData.length; index += reviewsPerSlide) {
      groupedReviews.push(reviewsData.slice(index, index + reviewsPerSlide));
    }

    return groupedReviews;
  }, [reviewsPerSlide]);

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
  }, [reviewsPerSlide]);

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
    const finalClonedSlideIndex = carouselSlides.length - 1;

    if (currentSlide === finalClonedSlideIndex) {
      setTransitionEnabled(false);
      setCurrentSlide(1);
    } else if (currentSlide === 0) {
      setTransitionEnabled(false);
      setCurrentSlide(totalSlides);
    }

    setIsAnimating(false);
  };

  useEffect(() => {
    if (transitionEnabled) return;

    const firstFrame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setTransitionEnabled(true);
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
    };
  }, [transitionEnabled]);

  useEffect(() => {
    if (isPaused || isAnimating || totalSlides <= 1) return;

    const interval = window.setInterval(() => {
      goToNextSlide();
    }, AUTOPLAY_DELAY);

    return () => {
      window.clearInterval(interval);
    };
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
      className="reviews-carousel"
      aria-label="Patient reviews"
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
        className="reviews-carousel__viewport"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="reviews-carousel__track"
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
                className="reviews-carousel__slide"
                key={`${slideIndex}-${slide[0]?.id}`}
                aria-hidden={activeSlide !== realSlideIndex}
                aria-label={`Reviews slide ${
                  realSlideIndex + 1
                } of ${totalSlides}`}
              >
                {slide.map((review) => (
                  <article className="review-card" key={review.id}>
                    <div
                      className="review-card__stars"
                      aria-label={`${review.rating} out of 5 stars`}
                    >
                      {Array.from({
                        length: 5,
                      }).map((_, starIndex) => (
                        <Icon
                          key={starIndex}
                          icon="material-symbols:star-rounded"
                          aria-hidden="true"
                          className="icon"
                        />
                      ))}
                    </div>

                    <blockquote className="review-card__quote">
                      <p>“{review.review}”</p>
                    </blockquote>

                    <div className="author">
                      {review.image && (
                        <img
                          src={review.image}
                          alt=""
                          className="review-card-image"
                        />
                      )}

                      <div>
                        <p className="review-card-name">{review.name}</p>

                        {review.treatment && (
                          <p className="review-card-treatment">
                            <i>{review.treatment}</i>
                          </p>
                        )}
                      </div>
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
            className="reviews-carousel__arrow reviews-carousel__arrow--previous"
            onClick={goToPreviousSlide}
            aria-label="Show previous reviews"
            disabled={isAnimating}
          >
            <Icon icon="ion:chevron-forward-outline" rotate={2} />
          </button>

          <button
            type="button"
            className="reviews-carousel__arrow reviews-carousel__arrow--next"
            onClick={goToNextSlide}
            aria-label="Show next reviews"
            disabled={isAnimating}
          >
            <Icon icon="ion:chevron-forward-outline" />
          </button>

          <div
            className="reviews-carousel__dots"
            aria-label="Choose reviews slide"
          >
            {slides.map((_, slideIndex) => (
              <button
                type="button"
                key={slideIndex}
                className={`reviews-carousel__dot ${
                  activeSlide === slideIndex
                    ? "reviews-carousel__dot--active"
                    : ""
                }`}
                onClick={() => goToSlide(slideIndex)}
                aria-label={`Go to reviews slide ${slideIndex + 1}`}
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

export default ReviewsCarousel;
