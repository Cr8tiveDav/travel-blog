import { useEffect, useRef, useState } from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Sidebar from '../Components/Sidebar';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { IoIosArrowUp } from 'react-icons/io';

const url = 'https://restcountries.com/v3.1/all';

const fetchCountries = async () => {
  console.log('fetching countries...');
  const fields = ['name', 'region', 'flags', 'cca3'];
  const { data } = await axios.get(`${url}?fields=${fields}`);
  return data;
};

export const loader = (queryClient) => async () => {
  await queryClient.ensureQueryData({
    queryKey: ['countries'],
    queryFn: () => fetchCountries(),
  });
  return null;
};

// Scroll to top functionality
// Get root element
const rootElement = document.documentElement;
// console.log(Object.getPrototypeOf(rootElement));
const scrollToTop = () => {
  rootElement.scrollTo({
    top: 0,
  });
};

const HomeLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const sentinelRef = useRef(null);
  const { data: countries } = useQuery({
    queryKey: ['countries'],
    queryFn: () => fetchCountries(),
  });
  console.log(countries);
  console.count('HomeLayout');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const isNotMobile = window.matchMedia('(min-width: 768px )').matches;
    console.log(isNotMobile);

    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log(entry);
        // Show when target bounding-client-rect top is < 0
        const isAboveViewport = entry.boundingClientRect.top < 0;
        console.log(isAboveViewport);
        setShowScrollBtn(isAboveViewport);
      },
      {
        threshold: 0, // Fires when any part of the target leaves the viewport
      }
    );
    // console.log(observer);
    const currentTarget = sentinelRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      // Clean up the observer when the component unmounts or re-renders
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Navbar />
      <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <button
        type='button'
        id='scrollToTopBtn'
        className={`${
          showScrollBtn
            ? 'opacity-80 translate-y-0'
            : 'opacity-0 translate-y-30'
        } fixed bottom-8 right-6 bg-stone-50 rounded-full p-2 shadow-md shadow-slate-400 cursor-pointer z-10 transform transition-all duration-500 ease-in-out`}
        onClick={() => scrollToTop()}
      >
        <IoIosArrowUp className=' text-2xl text-slate-500/70' />
      </button>

      <Outlet context={{ toggleSidebar, countries, sentinelRef }} />
    </>
  );
};
export default HomeLayout;
