import { useState } from 'react';
import Navbar from '../Components/Navbar';
import { Outlet, useLoaderData } from 'react-router';
import Sidebar from '../Components/Sidebar';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

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

  return (
    <>
      <Navbar />
      <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <Outlet context={{ toggleSidebar, countries }} />
    </>
  );
};
export default HomeLayout;
