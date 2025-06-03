import { useRef, useState } from 'react';
import { links } from '../data';

const Navbar = () => {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarRef = useRef(null);

  return (
    <nav className='bg-cyan-200 hidden md:block'>
      <div className='align-element'>
        <h2 className='text-2xl font-bold py-4'>
          GoTravel<span className='text-cyan-600'>Wise</span>
        </h2>
        <div>
          {links.map((link) => {
            const { id, href, text } = link;
            return (
              <a href={href} key={id}>
                {text}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
