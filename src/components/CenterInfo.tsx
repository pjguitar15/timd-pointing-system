const CenterInfo = () => {
  return (
    <main className='lg:w-[500px] bg-black px-12 flex flex-row md:flex-col items-center justify-center gap-16 w-full py-5'>
      <div className='flex flex-col gap-1 lg:gap-4 items-center py-5'>
        <h2 className='text-white text-2xl lg:text-5xl'>Match</h2>
        <h2 className='text-white text-7xl lg:text-9xl font-semibold'>25</h2>
      </div>
      <div className='flex flex-col gap-1 lg:gap-4 items-center'>
        <h2 className='text-white text-2xl lg:text-5xl'>Timeout</h2>
        <h2 className='text-white text-7xl lg:text-9xl font-semibold'>0:17</h2>
      </div>
    </main>
  );
};

export default CenterInfo;
