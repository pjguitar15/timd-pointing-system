import timdlogo from "../assets/TIMD.png";
import shia from "../assets/shia.png";
import legato from "../assets/legato.png";
import { Link } from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";
const Header = () => {
  return (
    <header className='bg-black w-full'>
      <main className='flex justify-center md:justify-between py-2 px-4 md:px-20 lg:px-24 items-center'>
        <div className='hidden md:flex gap-4 items-center'>
          <Link
            className='text-white'
            to='/all-games'
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
        <Link
          className='text-white border px-3 py-2 rounded text-sm'
          to='/all-games'
        >
          Back to all games
        </Link>
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
        </div>
      </main>
    </header>
  );
};

export default Header;
