import CenterInfo from "../components/CenterInfo";
import CountryAndName from "../components/CountryAndName";
import Header from "../components/Header";
import PlayerPoint from "../components/PlayerPoint";

const Court1 = () => {
  return (
    <main className='h-screen bg-black flex flex-col'>
      <Header matchDetails='Women Division | 55-60kg' />
      <div className='lg:flex justify-between'>
        <CountryAndName
          name='Lim Do Hyun'
          color='red'
          country='South Korea'
        />
        <CountryAndName
          name='Jun Mizutani'
          color='blue'
          country='Japan'
        />
      </div>
      <div className='md:flex justify-center h-full'>
        <PlayerPoint
          color='red'
          score={3}
        />
        <div className='hidden md:flex'>
          <CenterInfo />
        </div>
        <PlayerPoint
          color='blue'
          score={5}
        />
        <div className='flex md:hidden'>
          <CenterInfo />
        </div>
      </div>
    </main>
  );
};

export default Court1;
