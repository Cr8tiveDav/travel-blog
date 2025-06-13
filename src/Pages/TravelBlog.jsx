import { useLoaderData, useOutletContext } from 'react-router';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { createClient } from 'contentful';
import { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { nanoid } from 'nanoid';
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
  const [readTime, setReadTime] = useState(0);
  const { id: postId } = useLoaderData();
  const { toggleSidebar } = useOutletContext();

  const fetchPostById = async (postId) => {
    try {
      const entry = await client.getEntry(postId);
      console.log(entry);

      const introText = documentToPlainTextString(entry.fields.introduction);
      const conclusionText = documentToPlainTextString(entry.fields.conclusion);
      const mainSectionText = entry.fields?.mainSection
        ?.map((item) => {
          const titleAndBonusTip = `${item.fields.appTitle} ${
            item.fields?.bonusTip || ''
          }`;
          const documentText = documentToPlainTextString(
            item.fields.description
          );
          const subSectionText = `${titleAndBonusTip} ${documentText}`;
          return subSectionText;
        })
        .join(' ');

      const totalWords =
        `${introText} ${mainSectionText} ${conclusionText}`.split(/\s+/).length;
      const wordsPerMinute = 200;
      // TODO: calc the image view time
      // const imageViewTime = 12; // seconds per image
      // let numberOfImages = 0;
      // Calc reading time
      setReadTime(Math.ceil(totalWords / wordsPerMinute));

      const newEntry = [entry];
      console.log(newEntry);
      const post = newEntry.map((post) => {
        const {
          title,
          author,
          authorsImage,
          publishDate,
          images,
          introduction,
          mainSection,
          conclusion: conclusionData,
        } = post.fields;
        const id = post.sys.id;
        const img = images[0]?.fields?.file?.url;
        const authorsImg = authorsImage?.fields?.file?.url;
        const intro = introduction?.content;
        const conclusion = conclusionData?.content;
        return {
          id,
          title,
          author,
          authorsImg,
          publishDate,
          img,
          intro,
          mainSection,
          conclusion,
        };
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
            intro,
            mainSection,
            conclusion,
          } = item;
          console.log(publishDate);

          const contents = mainSection?.map((item) => {
            const { appTitle, description, bonusTip } = item.fields;
            const paragraphs = description.content.map((item) => {
              const values = item.content.map((item) => item.value).join('');
              return values;
            });
            return { appTitle, paragraphs, bonusTip };
          });

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
                {/* MetaData — Information about the article */}
                <div className='mb-4'>
                  <time
                    dateTime={publishDate}
                    className='text-xs sm:text-sm text-gray-500'
                  >
                    {date} <span className='text-gray-300'>•</span> {readTime}{' '}
                    min read
                  </time>
                </div>
              </header>

              <main>
                <figure className='h-65 mb-8'>
                  <img
                    src={heroImg}
                    alt={title}
                    className='w-full h-full object-cover'
                  />
                </figure>

                {/* Introduction */}
                {intro?.map((item) => {
                  const introduction = item.content;
                  return (
                    <div key={nanoid()} className=' mt-2'>
                      {introduction.map((item) => {
                        return (
                          <p
                            key={nanoid()}
                            className='text-gray-700 leading-relaxed'
                          >
                            {item.value}
                          </p>
                        );
                      })}
                    </div>
                  );
                })}

                {/* content */}
                {contents?.map((item) => {
                  const { appTitle, paragraphs, bonusTip } = item;
                  return (
                    <div key={nanoid()}>
                      <h1 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mt-6 text-gray-800'>
                        {appTitle}
                      </h1>
                      {paragraphs.map((paragraph) => (
                        <p
                          key={nanoid()}
                          className='text-gray-700 mt-2 leading-relaxed'
                        >
                          {paragraph}
                        </p>
                      ))}
                      <p className='text-gray-700 mt-2 leading-relaxed'>
                        {bonusTip}
                      </p>
                    </div>
                  );
                })}

                {/* Conclusion */}
                {conclusion?.map((item) => {
                  const conclusion = item.content;
                  return (
                    <div key={nanoid()} className=''>
                      {conclusion.map((item) => {
                        return (
                          <p
                            key={nanoid()}
                            className='text-gray-700 mt-6 leading-relaxed'
                          >
                            {item.value}
                          </p>
                        );
                      })}
                    </div>
                  );
                })}
              </main>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default TravelBlog;
