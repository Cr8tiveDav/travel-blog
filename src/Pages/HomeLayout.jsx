import { useEffect, useRef, useState } from 'react';
import Navbar from '../Components/Navbar';
import { Outlet, useLoaderData } from 'react-router';
import Sidebar from '../Components/Sidebar';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { IoIosArrowUp } from 'react-icons/io';

const baseUrl = 'https://restcountries.com/v3.1';

const fetchCountries = async (endpoint) => {
  console.log('fetching countries...');
  const { data } = await axios.get(`${baseUrl}${endpoint}`);
  return data;
};

export const loader = (queryClient) => async () => {
  const endPoint = '/all';
  await queryClient.ensureQueryData({
    queryKey: ['countries'],
    queryFn: () => fetchCountries(endPoint),
  });
  return { endPoint };
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
  const { endPoint } = useLoaderData();
  const { data: countries } = useQuery({
    queryKey: ['countries'],
    queryFn: () => fetchCountries(endPoint),
  });
  console.log(countries);
  console.count('HomeLayout');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // console.log(entry);
        // Show when not intersecting
        setShowScrollBtn(!entry.isIntersecting);
      },
      {
        threshold: 0.05, // 5% of the element is visible
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
