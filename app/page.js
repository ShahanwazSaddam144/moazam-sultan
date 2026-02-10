import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Portfolio from "./components/Portfolio";
import Qualification from "./components/Qualification";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import BookSession from "./components/bookSession";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return(
  <>
  <Navbar />
  <Hero />
  <Qualification />
  <BookSession />
  <Portfolio />
  <Services />
  <Testimonials />
  <Contact />
  <Footer />
  </>
  );
}
