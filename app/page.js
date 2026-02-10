import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Portfolio from "./components/Portfolio";
import Qualification from "./components/Qualification";
import Services from "./components/Services";
import BookSession from "./components/bookSession";

export default function Home() {
  return(
  <>
  <Navbar />
  <Hero />
  <Qualification />
  <BookSession />
  <Portfolio />
  <Services />
  </>
  );
}
