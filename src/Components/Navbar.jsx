import { links } from '../data';

const Navbar = () => {
  return (
    <nav className='hidden md:block fixed bg-stone-50 z-10 top-0 left-0 right-0 border-b-1 border-b-slate-300'>
      <div className='align-element grid grid-cols-[auto_1fr] place-items-center'>
        <h2 className='text-2xl text-gray-800 font-bold py-4'>
          GoTravel<span className='text-cyan-600'>Wise</span>
        </h2>
        <ul className='flex'>
          {links.map((link) => {
            const { id, href, text } = link;
            return (
              <li key={id}>
                <a
                  href={href}
                  className='text-lg capitalize text-slate-800 hover:text-cyan-600 p-2 rounded-lg transform transition-colors duration-300'
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
