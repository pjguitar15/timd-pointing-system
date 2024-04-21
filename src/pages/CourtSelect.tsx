import { Link } from "react-router-dom";
import TIMDLogo from "../assets/TIMD.png";

const CourtSelect = () => {
  return (
    <main className='bg-slate-800 h-screen flex flex-col items-center justify-center gap-6'>
      <Link to='/'>
        <img
          className='size-40'
          src={TIMDLogo}
          alt=''
        />
      </Link>
      <div className='text-center'>
        <h2 className='text-2xl text-white'>Select a Court</h2>
      </div>
      <div className='flex gap-3'>
        <Link
          to='/court-1'
          className='px-5 py-1 bg-yellow-500 text-slate-800 text-lg font-semibold'
        >
          Court 1
        </Link>
        <Link
          to='/court-2'
          className='px-5 py-1 bg-yellow-500 text-slate-800 text-lg font-semibold'
        >
          Court 2
        </Link>
      </div>
    </main>
  );
};

export default CourtSelect;
