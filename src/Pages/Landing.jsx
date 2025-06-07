import { useLocation, useOutletContext } from 'react-router';
import { FaBars } from 'react-icons/fa';
import Destinations from '../Components/Destinations';
import Slider from '../Components/Slider';
import TravelTips from '../Components/TravelTips';

const Landing = () => {
  const { toggleSidebar } = useOutletContext();

  console.count('Landing');

  return (
    <main className='text-3xl relative md:pt-16'>
      {/* <button onClick={() => nextSlide()}>slide</button> */}

      {/* Hero section */}
      <Slider />

      {/* Menu bar for mobile */}
      <button
        className='text-cyan-500 cursor-pointer md:hidden fixed top-4 left-4'
        onClick={() => {
          toggleSidebar();
        }}
      >
        <FaBars />
      </button>

      {/* Destinations section */}
      <Destinations />
      <TravelTips />
    </main>
  );
};
export default Landing;
