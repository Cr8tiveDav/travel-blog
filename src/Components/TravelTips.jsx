import tipImg1 from '../assets/images/World-travel.jpeg';
import tipImg2 from '../assets/images/Travel-bag.jpeg';
import tipImg3 from '../assets/images/Travel-app.jpeg';
import tipImg4 from '../assets/images/Travel-scam.jpeg';

const TravelTips = () => {
  return (
    <section id='travelTips' className='align-element py-8'>
      <h2 className='text-3xl text-cyan-500 sm:text-4xl md:text-5xl text-center mb-8'>
        Travel Tips
      </h2>
      <div className='grid gap-8 w-max mx-auto md:grid-cols-2'>
        <article className='w-75 md:w-80 min-h-80 p-4 bg-neutral-50 border-1 border-slate-300 rounded-xl cursor-pointer active:scale-103 hover:scale-103 transform transition-all duration-300'>
          <div className='h-52'>
            <img
              src={tipImg1}
              alt='World travel'
              className='w-full h-full object-cover rounded-lg'
            />
          </div>
          <h3 className='text-lg md:text-2xl font-bold mt-4'>
            Top 10 Things to Do Before Your First International Trip
          </h3>
        </article>

        <article className='w-75 md:w-80 min-h-80 p-4 bg-neutral-50 border-1 border-slate-300 rounded-xl cursor-pointer active:scale-103 hover:scale-103 transform transition-all duration-300'>
          <div className='h-52'>
            <img
              src={tipImg2}
              alt='Traveling bag'
              className='w-full h-full object-cover rounded-lg'
            />
          </div>
          <h3 className='text-lg md:text-2xl font-bold mt-4'>
            How to Pack Smart: The Art of Traveling
          </h3>
        </article>

        <article className='w-75 md:w-80 min-h-80 p-4 bg-neutral-50 border-1 border-slate-300 rounded-xl cursor-pointer active:scale-103 hover:scale-103 transform transition-all duration-300'>
          <div className='h-52'>
            <img
              src={tipImg3}
              alt='Travel app'
              className='w-full h-full object-cover rounded-lg'
            />
          </div>
          <h3 className='text-lg md:text-2xl font-bold mt-4'>
            Essential Travel Apps Every Traveler Should Download
          </h3>
        </article>

        <article className='w-75 md:w-80 min-h-80 p-4 bg-neutral-50 border-1 border-slate-300 rounded-xl cursor-pointer active:scale-103 hover:scale-103 transform transition-all duration-300'>
          <div className='h-52'>
            <img
              src={tipImg4}
              alt='Travel warning'
              className='w-full h-full object-cover rounded-lg'
            />
          </div>
          <h3 className='text-lg md:text-2xl font-bold mt-4'>
            Travel Scams Around the World - and How to Avoid Them
          </h3>
        </article>
      </div>
    </section>
  );
};

export default TravelTips;
