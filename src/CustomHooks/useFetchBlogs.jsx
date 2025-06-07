import { createClient } from 'contentful';
import { useState } from 'react';

const client = createClient({
  space: import.meta.env.VITE_SPACE_ID,
  environment: 'master',
  accessToken: import.meta.env.VITE_API_KEY,
});

console.log(import.meta.env.VITE_API_KEY);

const useFetchBlogs = () => {
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const resp = await client.getEntries({
        content_type: 'Travel Blog Post',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return <div>useFetchBlogs</div>;
};
export default useFetchBlogs;
