import Particle from "./components/Particle";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Carousel from "./components/Carousel";
import Accordions from "./components/Accordions";
import "./styles/home.css";

const Home = () => {

  return (
    <div>
      <Header />
      <section>
        <svg id="siteName" className="w-full" style={{ backgroundColor: "rgba(10, 10, 10, 0.55)" }}>
          <text className="max-[450px]:text-5xl text-6xl sm:text-7xl text-red-800 font-bold" x="50%" y="70%" dy=".04em" textAnchor="middle">
            Library
          </text>
        </svg>
        <div className="w-20 h-20 absolute left-1/2 top-12">
          <div className="circle circle1"></div>
          <div className="circle circle2"></div>
          <div className="circle circle3"></div>
          <div className="circle circle4"></div>
          <div className="circle circle5"></div>
        </div>
      </section>
      <Carousel />
      <Accordions/>
      <Footer />
      <Particle />
    </div>
  )
}

export default Home;
