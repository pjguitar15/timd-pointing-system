import { Link } from "react-router-dom";
import TIMDLogo from "../assets/TIMD.png";

const AllGames = () => {
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
        <div className='flex flex-col gap-2'>
          <h6 className='text-white text-xl'>On-going Matches</h6>
          <Link
            to='/game-select'
            className='border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-slate-950 px-4 py-1 font-semibold text-sm rounded-sm'
          >
            Return to game select
          </Link>
        </div>
        <div className='flex flex-col gap-4'>
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              className='bg-slate-400 hover:bg-white cursor-pointer px-8 py-2 flex gap-5 font-semibold rounded-sm text-lg text-slate-950 hover:text-blue-900'
              key={index}
            >
              <div>Aquino, Andro vs Estoce, Jusun</div>
              <div>|</div>
              <div>Men 65kg to 70kg</div>
              <div>|</div>
              <div>Match 1</div>
              <div>|</div>
              <div>13 / 21</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default AllGames;
