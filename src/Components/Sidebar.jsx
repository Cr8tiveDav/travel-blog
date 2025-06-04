import { FaXmark } from 'react-icons/fa6';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  console.count('sidebar');
  return (
    <aside
      className={`md:hidden bg-stone-50 w-80 p-4 z-10 h-screen fixed duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-[0]' : 'translate-x-[-100%] '
      }`}
    >
      <header className='flex place-content-between '>
        <h2 className='text-2xl font-bold'>
          GoTravel<span className='text-cyan-600'>Wise</span>
        </h2>
        <button className='cursor-pointer' onClick={() => toggleSidebar()}>
          <FaXmark className='text-3xl text-red-500' />
        </button>
      </header>

      {/* <nav>
        <ul>
          <li>
            <a href=''></a>
          </li>
        </ul>
      </nav> */}
    </aside>
  );
};
export default Sidebar;
