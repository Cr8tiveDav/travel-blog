import { useLoaderData, useOutletContext } from 'react-router';
import { createClient } from 'contentful';
import { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export const loader = ({ params }) => {
  console.log(params);
  return params;
};

const client = createClient({
  space: import.meta.env.VITE_SPACE_ID,
  environment: 'master',
  accessToken: import.meta.env.VITE_API_KEY,
});

const TravelBlog = () => {
  const [post, setPost] = useState([]);
  const { id: postId } = useLoaderData();
  const { toggleSidebar } = useOutletContext();

  const fetchPostById = async (postId) => {
    try {
      const entry = await client.getEntry(postId);

      const newEntry = [entry];
      console.log(newEntry);
      const post = newEntry.map((post) => {
        const { title, author, authorsImage, publishDate, images } =
          post.fields;
        const id = post.sys.id;
        const img = images[0]?.fields?.file?.url;
        const authorsImg = authorsImage?.fields?.file?.url;
        return { id, title, author, authorsImg, publishDate, img };
      });
      setPost(post);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPostById(postId);
  }, [postId]);
  return (
    <>
      <section className='mx-4 pt-8 md:mt-16 m-auto'>
        {/* Menu bar for mobile */}
        <button
          className='text-cyan-500 text-3xl cursor-pointer md:hidden fixed top-4 left-4'
          onClick={() => {
            toggleSidebar();
          }}
        >
          <FaBars />
        </button>
        {post.map((item) => {
          const {
            id,
            title,
            author,
            authorsImg,
            publishDate,
            img: heroImg,
          } = item;
          console.log(publishDate);

          const date = dayjs(publishDate).fromNow();
          console.log(date);
          return (
            <article key={id} className='py-6'>
              <header>
                <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4'>
                  {title}
                </h1>
                <address className='flex gap-3 place-items-center '>
                  <img
                    src={authorsImg}
                    alt={author}
                    className='w-10 object-cover rounded-full'
                  />
                  <span className='text-gray-700 font-semibold text-sm sm:text-base'>
                    {author}
                  </span>
                </address>
                <div className='mb-4'>
                  <time
                    dateTime={publishDate}
                    className='text-xs sm:text-sm text-gray-500'
                  >
                    {date} <span className='text-gray-300'>•</span> reading time
                  </time>
                </div>
              </header>

              <main>
                <figure className='h-55'>
                  <img
                    src={heroImg}
                    alt={title}
                    className='w-full h-full object-cover'
                  />
                </figure>
              </main>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default TravelBlog;
