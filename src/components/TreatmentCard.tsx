import { useEffect, useRef, useState } from "react";
import { treatmentdata } from "../data/treatments";
import Button from "../components/Button";
import { Icon } from "@iconify/react";

const TreatmentCard = () => {
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cardsElement = cardsRef.current;

    if (!cardsElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(cardsElement);
        }
      },
      {
        threshold: 0.1,
      },
    );

    observer.observe(cardsElement);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardsRef}
      className={`treatmentcard-container ${
        isVisible ? "treatmentcard-container--visible" : ""
      }`}
    >
      {treatmentdata.map((treatment) => (
        <article className="treatmentcard" key={treatment.name}>
          <img src={treatment.img} alt={treatment.name} />
          <div className="card-text">
            <h3>{treatment.name}</h3>

            <p>{treatment.intro}</p>

            <Button
              href="/invisalign"
              variant="text"
              icon={<Icon icon="mingcute:arrow-right-fill" />}
            >
              Learn More
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default TreatmentCard;
