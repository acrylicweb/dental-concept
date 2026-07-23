import Button from "../components/Button";
import TreatmentCard from "../components/TreatmentCard";
import ResultsCarousel from "../components/ResultsCarousel";
import UniqueSP from "../components/usp";
import { Icon } from "@iconify/react";
import ReviewsCarousel from "../components/ReviewsCarousel";
const Home = () => {
  return (
    <main className="home-page-container">
      <section className="hero page-sect">
        <div className="content">
          <div className="text">
            <h1>
              The smile you’ve always wanted, delivered by experts you can trust
            </h1>
            <img
              src="https://d12t91h5erunhq.cloudfront.net/home/dental-home-mobile-hero.webp"
              alt="hero image of a woman smiling"
            />
            <p>
              Transform your smile with advanced cosmetic dentistry tailored to
              you.
              <br /> Our experienced team combines precision, technology and a
              personal <br /> approach to create natural-looking results.
            </p>
            <Button href="/" icon={<Icon icon="mingcute:arrow-right-fill" />}>
              Book your smile consultation
            </Button>
          </div>
          <div className="trust-btn-holder">
            {" "}
            <Button href="/" icon={<Icon icon="mingcute:arrow-right-fill" />}>
              Book your smile consultation
            </Button>
            <div className="trusts">
              <article className="trust">
                <div className="stars-container">
                  <Icon icon="material-symbols:star" className="star" />
                  <Icon icon="material-symbols:star" className="star" />
                  <Icon icon="material-symbols:star" className="star" />
                  <Icon icon="material-symbols:star" className="star" />
                  <Icon icon="material-symbols:star" className="star" />
                </div>
                <span>4.9 Google rating</span>
              </article>{" "}
              <hr />
              <article className="trust">
                <Icon icon="material-symbols:trophy" className="icon" />
                <span>
                  Award-winning <br />
                  dental team
                </span>
              </article>{" "}
              <hr />
              <article className="trust">
                <Icon icon="mdi:location" className="icon" />
                <span>
                  Trusted by thousands <br />
                  of local patients
                </span>
              </article>{" "}
              <hr />
              <article className="trust">
                <Icon icon="ph:credit-card" className="icon" />
                <span>
                  0% finance options <br />
                  available
                </span>
              </article>
            </div>
          </div>
        </div>
      </section>
      <section className="sect2 treatments-sect page-sect">
        <div className="text">
          <p className="eyebrow">our treatments</p>
          <h2>
            Tailored treatments for
            <br /> stunning, heathy smiles
          </h2>
          <p>
            From subtle enhancements to complete smile makeovers, we offer a
            full range <br /> of advanced treatments to help you look and feel
            your best.
          </p>
        </div>
        <TreatmentCard />

        <Button href="/treatments">View all Treatments</Button>
      </section>
      <section className="sect3 page-sect">
        <div className="text">
          <p className="eyebrow">real results</p>
          <h2>Smile transformations that speak for themselves</h2>
          <p>
            Every smile is unique. Here are just a few of our patients
            incredible results
          </p>
          <Button href="/" icon={<Icon icon="mingcute:arrow-right-fill" />}>
            View More Before & Afters
          </Button>
        </div>
        <ResultsCarousel />
        <Button
          className="result-tablet"
          href="/"
          icon={<Icon icon="mingcute:arrow-right-fill" />}
        >
          View More Before & Afters
        </Button>
      </section>
      <section className="sect4 page-sect">
        <div className="text">
          <p className="eyebrow">why choose elevate</p>
          <h2>A better experience. Exceptional results.</h2>
        </div>
        <UniqueSP />
      </section>
      <section className="sect5 page-sect">
        <Button
          className="team-tablet"
          href="/"
          icon={<Icon icon="mingcute:arrow-right-fill" />}
        >
          Meet the Team
        </Button>{" "}
        <img
          src="https://d12t91h5erunhq.cloudfront.net/home/team.webp"
          alt="picture of the team"
        />
        <div className="text">
          <p className="eyebrow">meet our team</p>
          <h2>
            Experts who genuinely <br />
            care about your smile
          </h2>
          <p>
            Our friendly teamcombines clinical excellence with a personal
            <br /> touch, ensuring you feel carecd for at every visit
          </p>
          <Button href="/" icon={<Icon icon="mingcute:arrow-right-fill" />}>
            Meet the Team
          </Button>
        </div>
      </section>
      <section className="sect6 page-sect">
        <div className="text">
          <p className="eyebrow">patients love us</p>
          <h2>Real reviews from real patients</h2>
        </div>
        <ReviewsCarousel />
      </section>
      <section className="sect7 page-sect">
        <div className="text">
          <h2>Ready to love your smile?</h2>
          <p>
            Book your consultation today and take the first step <br /> towards
            the confident smile you deserve.
          </p>
        </div>
        <Button href="/" icon={<Icon icon="mingcute:arrow-right-fill" />}>
          Book now
        </Button>
      </section>
    </main>
  );
};

export default Home;
