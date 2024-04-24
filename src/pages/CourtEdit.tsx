import CenterInfo from "../components/CenterInfo";
import CountryAndNameEdit from "../components/CountryAndNameEdit";
import Header from "../components/Header";
import PlayerPointEdit from "../components/PlayerPointEdit";

const CourtEdit = () => {
  return (
    <main className='h-screen bg-black flex flex-col'>
      <Header />
      <div className='lg:flex justify-between'>
        <CountryAndNameEdit
          playerNum='1'
          color='red'
        />
        <CountryAndNameEdit
          playerNum='2'
          color='blue'
        />
      </div>
      <div className='md:flex justify-center h-full'>
        <PlayerPointEdit
          playerNum='1'
          color='red'
        />
        <div className='hidden md:flex'>
          <CenterInfo />
        </div>
        <PlayerPointEdit
          playerNum='2'
          color='blue'
        />
        <div className='flex md:hidden'>
          <CenterInfo />
        </div>
      </div>
    </main>
  );
};

export default CourtEdit;
