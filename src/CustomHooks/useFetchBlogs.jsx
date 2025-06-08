import { createClient } from 'contentful';
import { useEffect, useState } from 'react';

const client = createClient({
  space: import.meta.env.VITE_SPACE_ID,
  environment: 'master',
  accessToken: import.meta.env.VITE_API_KEY,
});

export const useFetchBlogs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  const getData = async () => {
    try {
      const resp = await client.getEntries({
        content_type: 'travelBlogPost',
      });

      const data = resp.items.map((blog) => {
        const { title, images } = blog.fields;
        const id = blog.sys.id;
        const img = images[0]?.fields?.file?.url;
        return { title, id, img };
      });
      setIsLoading(false);
      setBlogs(data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { isLoading, blogs };
};
