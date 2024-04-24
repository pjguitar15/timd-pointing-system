import { useCourtContext } from "../Context/CourtContext";
import CenterInfo from "../components/CenterInfo";
import CountryAndName from "../components/CountryAndName";
import Header from "../components/Header";
import PlayerPoint from "../components/PlayerPoint";

const Court = () => {
  const { courtInfo } = useCourtContext();
  return (
    <main className='h-screen bg-black flex flex-col'>
      <Header />
      <div className='lg:flex justify-between'>
        <CountryAndName
          name={courtInfo.player1.name}
          color='red'
          country={courtInfo.player1.country}
        />
        <CountryAndName
          name={courtInfo.player2.name}
          color='blue'
          country={courtInfo.player2.country}
        />
      </div>
      <div className='md:flex justify-center h-full'>
        <PlayerPoint
          color='red'
          playerNum='1'
        />
        <div className='hidden md:flex'>
          <CenterInfo />
        </div>
        <PlayerPoint
          color='blue'
          playerNum='2'
        />
        <div className='flex md:hidden'>
          <CenterInfo />
        </div>
      </div>
    </main>
  );
};

export default Court;
