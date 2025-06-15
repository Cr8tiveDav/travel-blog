import { useEffect } from 'react';
import { FaXmark } from 'react-icons/fa6';
import { FaHome, FaGlobe, FaInfoCircle } from 'react-icons/fa';
import { MdTipsAndUpdates } from 'react-icons/md';
import { links } from '../data';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  console.count('sidebar');

  // Remove scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    // Clean up in case component unmounts
    return () => {
      return () => {
        document.body.classList.remove('overflow-hidden');
      };
    };
  }, [isSidebarOpen]);

  return (
    <aside
      className={`md:hidden bg-stone-50 w-[80%] sm:w-[50%] p-4 z-20 h-screen fixed  duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-[0]' : 'translate-x-[-100%] '
      }`}
    >
      <header className='flex place-content-between '>
        <h2 className='text-2xl text-gray-800  font-bold'>
          GoTravel<span className='text-cyan-700'>Wise</span>
        </h2>
        <button className='cursor-pointer' onClick={() => toggleSidebar()}>
          <FaXmark className='text-2xl text-gray-700' />
        </button>
      </header>

      <nav className='mt-4'>
        <ul>
          {links.map((link) => {
            const { id, href, text } = link;
            return (
              <li key={id} className=''>
                <a
                  href={href}
                  onClick={() => toggleSidebar()}
                  className='text-lg capitalize text-slate-800 flex gap-2 place-items-center active:bg-slate-200 hover:bg-slate-200 p-2 rounded-lg transform transition-colors duration-300 '
                >
                  {text === 'home' && <FaHome className='text-cyan-700' />}
                  {text === 'destinations' && (
                    <FaGlobe className='text-cyan-700' />
                  )}
                  {text === 'travel tips' && (
                    <MdTipsAndUpdates className='text-cyan-700' />
                  )}
                  {text === 'about' && (
                    <FaInfoCircle className='text-cyan-700' />
                  )}
                  {text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
export default Sidebar;
