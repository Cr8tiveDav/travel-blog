import { useRef, useState } from 'react';
import { links } from '../data';

const Navbar = () => {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarRef = useRef(null);

  return (
    // <nav className='bg-cyan-200 hidden md:block'>
    //   <div className='align-element'>
    //     <h2 className='text-2xl font-bold py-4'>
    //       GoTravel<span className='text-cyan-600'>Wise</span>
    //     </h2>
    //     <div>
    //       {links.map((link) => {
    //         const { id, href, text } = link;
    //         return (
    //           <a href={href} key={id}>
    //             {text}
    //           </a>
    //         );
    //       })}
    //     </div>
    //   </div>
    // </nav>

    <nav className='hidden md:block'>
      <div className='align-element grid grid-cols-[auto_1fr] place-items-center'>
        <h2 className='text-2xl font-bold py-4'>
          GoTravel<span className='text-cyan-600'>Wise</span>
        </h2>
        <ul className='flex'>
          {links.map((link) => {
            const { id, href, text } = link;
            return (
              <li key={id}>
                <a
                  href={href}
                  // onClick={() => toggleSidebar()}
                  className='text-lg capitalize text-slate-800 active:bg-slate-200 hover:bg-slate-200 p-2 rounded-lg transform transition-colors duration-300'
                >
                  {text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
