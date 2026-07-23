import { Icon } from "@iconify/react";
import { Link } from "react-router";
import Button from "./Button";
const Footer = () => {
  return (
    <footer>
      <div className="content">
        <div className="top">
          <section className="footer-sect sect1">
            <img src="" alt="logo" />
            <p>
              Advanced cosmetic dentistry delivered with precision, care and a
              personal touch.
            </p>
            <div className="sm-holder">
              <article className="icon-holder">
                <Icon icon="mdi:instagram" className="icon" />
              </article>
              <article className="icon-holder">
                <Icon icon="gg:facebook" className="icon" />
              </article>
              <article className="icon-holder">
                <Icon icon="ri:google-fill" className="icon" />
              </article>
              <article className="icon-holder">
                <Icon icon="ic:baseline-tiktok" className="icon" />
              </article>
            </div>
          </section>
          <section className="footer-sect sect2">
            <h4>Quick Links</h4>
            <div className="links-holder">
              <Link to="/">Home</Link>
              <Link to="/">Treatments</Link>
              <Link to="/">Invisalign</Link>
              <Link to="/">About Us</Link>
              <Link to="/">Contact</Link>
            </div>
          </section>
          <section className="footer-sect sect3">
            <h4>Treatments</h4>
            <div className="links-holder">
              <Link to="/">Invisalign</Link>
              <Link to="/">Veneers</Link>
              <Link to="/">Teeth Whitening</Link>
              <Link to="/">Dental Implants</Link>
              <Link to="/">Smile Makeovers</Link>
            </div>
          </section>
        </div>{" "}
        <div className="middle">
          <section className="footer-sect sect4">
            <h4>Contact</h4>
            <div className="links-holder">
              <Link to="/">020 1234 5678</Link>
              <Link to="/">hello@elevatedental.co.uk</Link>
              <Link to="/">123 Smile Street London SW1A 1AA</Link>
              <Link to="/">
                Mon - Fri: 9am - 6pm
                <br /> Sat: 9am - 2pm
              </Link>
            </div>
          </section>
          <section className="footer-sect sect5">
            <h4>Book a Consultation</h4>
            <p>start your smile journey today</p>
            <Button href="/" icon={<Icon icon="mingcute:arrow-right-fill" />}>
              Book Now
            </Button>{" "}
          </section>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
