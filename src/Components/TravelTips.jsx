import { Link } from 'react-router-dom';
import { useFetchBlogs } from '../CustomHooks/useFetchBlogs';

const TravelTips = () => {
  const { isLoading, blogs } = useFetchBlogs();
  console.log(isLoading);
  // console.log(blogs);
  return (
    <section id='travelTips' className='align-element py-8'>
      <h2 className='text-2xl sm:text-3xl font-semibold text-cyan-600 text-center mb-8'>
        Travel Tips
      </h2>
      <div
        className='grid gap-8 w-max mx-auto text-gray-800
      sm:grid-cols-2 lg:grid-cols-3'
      >
        {blogs.map((blog) => {
          const { id, title, img } = blog;
          return (
            <Link
              key={id}
              to={`/blog/${id}`}
              className='w-75 sm:w-70 md:w-80 min-h-70 p-4 bg-neutral-50 border-1 border-slate-300 rounded-xl cursor-pointer active:scale-102 active:bg-cyan-50 hover:scale-102 hover:bg-slate-100 transform transition-all duration-300'
            >
              <div className='h-52'>
                <img
                  src={img}
                  alt={title}
                  className='w-full h-full object-cover rounded-lg'
                />
              </div>
              <h3 className='text-lg leading-5 font-bold mt-4'>{title}</h3>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default TravelTips;
