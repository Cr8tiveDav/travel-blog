import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Select from 'react-select';

const Destinations = () => {
  const { countries } = useOutletContext();
  const [selectedRegion, setSelectedRegion] = useState('Africa');
  const [activeButton, setActiveButton] = useState(0);
  const [loadCount, setLoadCount] = useState(6);

  console.count('Destination');

  // if (isPending) {
  //   return <div className='loading'></div>;
  // }
  // if (isError) {
  //   return <div>Something went wrong! :(</div>;
  // }

  const regions = [
    ...new Set(
      countries.map((country) => {
        return country.region;
      })
    ),
  ]
    .filter((region) => region !== 'Antarctic')
    .sort() // Sort in alphabetical order
    .map((region) => ({ value: region, label: region }));

  const getRegion = (region) => {
    console.log(region);
    setSelectedRegion(region);
  };

  // Filter countries of the same region
  const countriesByRegion = countries.filter(
    (country) => country.region === selectedRegion
  );
  console.log(countriesByRegion);

  // const paginate = Array.from({ length: countriesByRegion.length });
  // console.log(paginate);

  // const itemsPerPage = 8;
  // const pages = Math.ceil(countriesByRegion.length / itemsPerPage);
  // console.log(pages);

  // const newItems = Array.from({ length: pages }, (_, index) => {
  //   const start = index * itemsPerPage;
  //   const tempItems = countriesByRegion.slice(start, start + itemsPerPage);
  //   return tempItems;
  // });
  // console.log(newItems);

  const addDestinations = () => {
    const numOfDestinations = countriesByRegion.length;
    console.log(numOfDestinations);
    if (loadCount < numOfDestinations) {
      setLoadCount((prev) => prev + 6);
    }
    if (loadCount >= numOfDestinations) {
      setLoadCount(6);
    }
  };
  console.log(loadCount);

  return (
    <section className=' align-element py-10'>
      <article>
        <h2 className='text-3xl text-cyan-500 sm:text-4xl md:text-5xl text-center mb-3'>
          Destinations
        </h2>
        <p className='text-center text-base sm:text-xl mb-3'>
          Select and Explore the World
        </p>

        {/* Select input for mobile */}
        <Select
          options={regions}
          placeholder='Select a Region'
          className=' text-sm max-w-40 sm:max-w-42 mx-auto py-4 md:hidden'
          classNamePrefix='region-select'
          onChange={(e) => getRegion(e.value)}
        />

        <div className=' hidden md:block w-max mx-auto  border-b-1 border-b-neutral-300'>
          {regions.map((region, index) => {
            return (
              <button
                key={index}
                className={`cursor-pointer text-lg px-4 pb-2 border-b-2 transform transition-all duration-300 ${
                  index === activeButton
                    ? 'border-b-cyan-600'
                    : 'border-transparent'
                }  `}
                onClick={() => {
                  setSelectedRegion(region.value);
                  setActiveButton(index);
                }}
              >
                {region.value}
              </button>
            );
          })}
        </div>

        <div className='w-max mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-8'>
          {countriesByRegion.map((country, index) => {
            const {
              cca3,
              name: { common },
              flags,
            } = country;
            return (
              index < loadCount && (
                // Country card
                <div
                  key={cca3}
                  className='relative w-45 hover:scale-103 transform transition-all duration-300'
                >
                  <img
                    src={flags?.png}
                    alt={common}
                    // loading='lazy'
                    className='object-cover aspect-square'
                  />
                  <p className='text-sm font-medium absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-stone-50 px-4 py-2'>
                    {common}
                  </p>
                </div>
              )
            );
          })}
        </div>

        <div className=' flex justify-center'>
          <button
            className='cursor-pointer text-cyan-600 w-30 sm:w-32 md:w-40 text-lg border-2 border-cyan-600 rounded-sm px-3 py-0.5 transform transition-colors duration-300 active:bg-cyan-600 hover:bg-cyan-600 hover:text-cyan-50'
            onClick={() => addDestinations()}
          >
            {loadCount < countriesByRegion.length ? 'Load more' : 'Show less'}
          </button>
        </div>
      </article>
    </section>
  );
};
export default Destinations;
