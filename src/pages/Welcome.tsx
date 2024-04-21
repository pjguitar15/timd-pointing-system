import { Link } from "react-router-dom";
import TIMDLogo from "../assets/TIMD.png";

const Welcome = () => {
  return (
    <main className='bg-slate-800 h-screen flex flex-col items-center justify-center gap-6'>
      <img
        className='size-40'
        src={TIMDLogo}
        alt=''
      />
      <div className='text-center'>
        <h2 className='text-3xl text-white'>Welcome to TIMD Pointing System</h2>
        <h6 className='text-xl text-slate-400'>Web App build by Philcob</h6>
      </div>
      <Link
        to='/court-select'
        className='px-5 py-1 bg-yellow-500 text-slate-800 text-lg font-semibold'
      >
        Start
      </Link>
    </main>
  );
};

export default Welcome;
