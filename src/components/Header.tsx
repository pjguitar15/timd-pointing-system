import timdlogo from "../assets/TIMD.png";
import shia from "../assets/shia.png";
import legato from "../assets/legato.png";
import { Link } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { BsArrowLeftCircle } from "react-icons/bs";
const Header = ({ matchDetails }: { matchDetails: string }) => {
  return (
    <header className='bg-black w-full'>
      <main className='flex justify-center md:justify-between py-2 px-4 md:px-20 lg:px-24 items-center'>
        <div className='hidden md:flex gap-4 items-center'>
          <Link
            className='text-white'
            to='/court-select'
          >
            <BsArrowLeftCircle className='text-2xl' />
          </Link>
          <Link to='/'>
            <img
              className='size-12'
              src={timdlogo}
              alt=''
            />
          </Link>
          <img
            className='size-12'
            src={shia}
            alt=''
          />
        </div>
        {/* Middle */}
        <div className='flex gap-5 items-center'>
          <h2 className='text-white md:text-2xl font-medium'>{matchDetails}</h2>
          <button className='md:hidden px-3 py-1 border border-white text-white text-sm rounded-md hover:bg-white hover:text-black'>
            Go to Edit Mode
          </button>
        </div>
        <div className='hidden md:flex gap-4 items-center'>
          <div className='w-28'>
            <img
              src={legato}
              alt=''
            />
          </div>
          <img
            className='size-12'
            src={timdlogo}
            alt=''
          />
          <Link
            to='/'
            className='text-white'
          >
            <MdModeEdit />
          </Link>
        </div>
      </main>
    </header>
  );
};

export default Header;
