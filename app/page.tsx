import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import FeaturedProperties from "./components/FeaturedProperties";
import Categories from "./components/Categories";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SearchBar />
      <FeaturedProperties />
      <Categories />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
} 