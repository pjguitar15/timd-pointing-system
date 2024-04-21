import CenterInfo from "../components/CenterInfo";
import CountryAndName from "../components/CountryAndName";
import Header from "../components/Header";
import PlayerPoint from "../components/PlayerPoint";

const Court1 = () => {
  return (
    <main className='h-screen bg-black flex flex-col'>
      <Header matchDetails='Male Division | 68-70kg' />
      <div className='lg:flex justify-between'>
        <CountryAndName
          name='Aquino, Andro'
          color='red'
          country='Philippines'
        />
        <CountryAndName
          name='Worrawut Kamwilaisak'
          color='blue'
          country='Thailand'
        />
      </div>
      <div className='md:flex justify-center h-full'>
        <PlayerPoint
          color='red'
          score={13}
        />
        <div className='hidden md:flex'>
          <CenterInfo />
        </div>
        <PlayerPoint
          color='blue'
          score={17}
        />
        <div className='flex md:hidden'>
          <CenterInfo />
        </div>
      </div>
    </main>
  );
};

export default Court1;
