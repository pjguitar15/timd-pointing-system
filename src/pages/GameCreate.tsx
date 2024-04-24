import { Link } from "react-router-dom";
import TIMDLogo from "../assets/TIMD.png";

const GameCreate = () => {
  return (
    <main className='bg-slate-950 h-screen'>
      <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]' />
      <div className='flex flex-col items-center justify-center gap-6 h-full relative z-50'>
        <Link to='/'>
          <img
            className='size-40'
            src={TIMDLogo}
            alt=''
          />
        </Link>
        <div className='text-center'>
          <h2 className='text-2xl text-white'>Enter your game details</h2>
        </div>
        <form className='w-[400px] flex flex-col gap-3'>
          <div className='flex flex-col items-start'>
            <span className='text-white text-xs font-medium mb-1'>
              Player 1
            </span>
            <input
              placeholder='Enter player 1'
              className='px-2 py-2 rounded-sm w-full outline-none'
              type='text'
            />
          </div>
          <div className='flex flex-col items-start'>
            <span className='text-white text-xs font-medium mb-1'>
              Player 2
            </span>
            <input
              placeholder='Enter player 2'
              className='px-2 py-2 rounded-sm w-full outline-none'
              type='text'
            />
          </div>
          <div className='flex flex-col items-start'>
            <span className='text-white text-xs font-medium mb-1'>
              Match Details
            </span>
            <input
              placeholder='Enter match details'
              className='px-2 py-2 rounded-sm w-full outline-none'
              type='text'
            />
          </div>
        </form>
        <div className='flex gap-3'>
          <Link
            to='/game'
            className='px-5 py-1 bg-yellow-500 text-slate-950 text-md font-semibold rounded-sm'
          >
            Create game
          </Link>
          <Link
            to='/game-select'
            className='px-5 py-1 border border-yellow-500 hover:bg-yellow-500 text-yellow-500 hover:text-slate-950 text-md font-semibold rounded-sm'
          >
            Cancel
          </Link>
        </div>
      </div>
    </main>
  );
};

export default GameCreate;
