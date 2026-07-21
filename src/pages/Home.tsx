import Button from "../components/Button";
import TreatmentCard from "../components/TreatmentCard";
const Home = () => {
  return (
    <main className="home-page-container">
      <h1>Home</h1>
      <Button href="/contact">Book Consultation</Button>
      <Button href="/treatments" variant="secondary">
        View Treatments
      </Button>
      <Button href="/invisalign" variant="text">
        Learn More
      </Button>
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
    </main>
  );
};

export default Home;
