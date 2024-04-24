import timdlogo from "../assets/TIMD.png";
import shia from "../assets/shia.png";
import legato from "../assets/legato.png";
import { Link, useLocation } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useCourtContext } from "../Context/CourtContext";
const Header = () => {
  const location = useLocation();
  const isEditMode = location.pathname.slice(9) === "edit";
  const { courtInfo, updateMatchDetails } = useCourtContext();
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
          {isEditMode ? (
            <input
              className='text-white text-2xl font-semibold bg-transparent w-full text-center outline-none'
              value={courtInfo.matchDetails}
              onChange={(e) => updateMatchDetails(e.target.value)}
              type='text'
            />
          ) : (
            <h2 className='text-white md:text-2xl font-medium'>
              {courtInfo.matchDetails}
            </h2>
          )}

          {!isEditMode ? (
            <Link
              to='/court/edit'
              className='text-white border border-white px-3 py-1 rounded-md flex items-center gap-2'
            >
              <MdModeEdit />
              Go to Edit Mode
            </Link>
          ) : (
            <Link
              to='/court-1/'
              className='text-white underline w-60'
            >
              Back to Display Mode
            </Link>
          )}

          {/* {isEditMode && (
            <p className='text-white underline w-60'>You are in edit mode</p>
          )} */}
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
        </div>
      </main>
    </header>
  );
};

export default Header;
