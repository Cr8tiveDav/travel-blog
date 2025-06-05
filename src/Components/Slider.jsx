import { useEffect, useState } from 'react';
import { slides } from '../data';
import { useOutletContext } from 'react-router';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const { sentinelRef } = useOutletContext();
  // console.log(sentinelRef);

  const nextSlide = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  useEffect(() => {
    if (currentIndex === slides.length - 1) {
      // Hit the clone of the first slide
      setTimeout(() => {
        setTransitionEnabled(false);
        setCurrentIndex(1); // jump to the original first slide

        // Restore transition
        setTimeout(() => {
          setTransitionEnabled(true);
        }, 20);
      }, 1000); // duration should match CSS transition
    }

    if (currentIndex === 0) {
      // Hit the clone of the last slide (backward support)
      setTimeout(() => {
        setTransitionEnabled(false);
        setCurrentIndex(slides.length - 2); // jump to the original last slide

        // Restore transition
        setTimeout(() => {
          setTransitionEnabled(true);
        }, 20);
      }, 1000);
    }
  }, [currentIndex]);

  useEffect(() => {
    const sliderId = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(sliderId);
  }, [currentIndex]);

  return (
    <section id='home' className='w-screen h-screen relative overflow-hidden'>
      {/* container for the hero bg */}
      <div
        className={`flex transition-transform duration-1000 ease-in-out  ${
          transitionEnabled ? '' : '!transition-none'
        }`}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {/* Loop through the hero bg array */}
        {slides.map((image, index) => {
          const { href } = image;
          return (
            // Container for each hero image returned from the array
            // Each container takes the viewport of the screen and does not shrink
            <div
              key={index}
              className=' relative w-screen h-screen flex-shrink-0'
            >
              <img
                src={href}
                alt='hero'
                className='w-full h-full object-cover'
              />
              <div className='absolute inset-0 bg-slate-900/50'></div>
            </div>
          );
        })}
      </div>
      <div className='absolute inset-0 flex justify-center items-center'>
        <h1 className='text-slate-200 text-4xl/snug px-4 md:text-5xl font-bold'>
          Discover and Explore the World
        </h1>
      </div>
      <div ref={sentinelRef} className='w-full h-16 absolute bottom-0.5'></div>
    </section>
  );
};
export default Slider;
