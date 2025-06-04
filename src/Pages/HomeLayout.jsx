import { useEffect, useState } from 'react';
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
console.log(Object.getPrototypeOf(rootElement));
const scrollToTop = () => {
  console.log('clicked');
  rootElement.scrollTo({
    top: 0,
  });
};

const HomeLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  // console.dir(rootElement);

  // useEffect(() => {

  // }, []);

  return (
    <>
      <Navbar />
      <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <button
        type='button'
        className='fixed bottom-4 right-4 bg-stone-50 rounded-full p-1 shadow-md shadow-slate-400 cursor-pointer z-10'
        onClick={() => scrollToTop()}
      >
        <IoIosArrowUp className=' text-2xl text-slate-900/50' />
      </button>

      <Outlet context={{ toggleSidebar, countries }} />
    </>
  );
};
export default HomeLayout;
