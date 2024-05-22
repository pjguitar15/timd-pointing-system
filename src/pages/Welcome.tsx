import { Link } from "react-router-dom";
import TIMDLogo from "../assets/TIMD.png";
import WelcomeImage from "../assets/homepage-img.png";

const Welcome = () => {
  return (
    <main className='relative w-full bg-slate-950 h-screen'>
      <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]' />
      <div className='flex flex-col items-center justify-center gap-6 h-full z-50 relative'>
        <img
          className='size-40 mx-auto'
          src={TIMDLogo}
          alt=''
        />
        <img
          className='w-[45%] mt-7'
          src={WelcomeImage}
          alt=''
        />
        <div className='text-center z-50'>
          <h2 className='text-3xl text-white'>
            Welcome to TIMD Pointing System
          </h2>
          <div className='text-lg text-slate-500 flex justify-center items-center gap-1'>
            <p className='me-0'>Web App built by</p>
            <a
              className='ms-0 underline italic'
              target='_blank'
              href='https://philcodes-portfolio.vercel.app/'
            >
              Philcob Suzuki Josol
            </a>
          </div>
        </div>

        <Link
          to='/game-select'
          className='px-7 py-1 bg-yellow-500 text-slate-950 text-lg font-semibold'
        >
          Start
        </Link>
      </div>
    </main>
  );
};

export default Welcome;
