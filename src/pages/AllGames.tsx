import { Link } from "react-router-dom";
import TIMDLogo from "../assets/TIMD.png";
import { useEffect, useState } from "react";
import phflag from "../assets/ph-flag.webp";
import thaiFlag from "../assets/thai.webp";
import koreanFlag from "../assets/kr-flag.jpg";
import jpFlag from "../assets/japan.png";
import unknownFlag from "../assets/no-flag.png";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import GameActionModal from "../components/GameActionModal";
import EnterPinModal from "../components/EnterPinModal";
import EnterPassModal from "../components/EnterPassModal";

export type GameDataType = {
  id: string;
  player1Country: string;
  player2Country: string;
  matchDetails: string;
  matchNumber: number;
  player1Name: string;
  player2Name: string;
  player1Points: number;
  player2Points: number;
};

const AllGames = () => {
  const [data, setData] = useState<GameDataType[]>([]);
  const [gameActionModalOpen, setGameActionModalOpen] = useState(false);
  const [enterPinModalOpen, setEnterPinModalOpen] = useState(false);
  const [enterPassModalOpen, setEnterPassModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  useEffect(() => {
    const gameRef = collection(db, "games");
    const unsubscribe = onSnapshot(gameRef, (querySnapshot) => {
      const updatedGames: GameDataType[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as GameDataType[];
      setData(updatedGames);
      console.log(updatedGames);
    });

    return () => unsubscribe();
  }, []);

  const toggleGameActionModal = () => {
    setGameActionModalOpen(!gameActionModalOpen);
  };

  const togglePinModal = () => {
    setEnterPinModalOpen(!enterPinModalOpen);
  };

  const togglePassModal = () => {
    setEnterPassModalOpen(!enterPassModalOpen);
  };

  return (
    <main className='bg-slate-950 h-screen'>
      <GameActionModal
        open={gameActionModalOpen}
        toggleModal={toggleGameActionModal}
        openJuryModal={togglePinModal}
        togglePassModal={togglePassModal}
        selectedId={selectedId}
      />
      <EnterPinModal
        open={enterPinModalOpen}
        toggleModal={togglePinModal}
        selectedId={selectedId}
      />
      <EnterPassModal
        open={enterPassModalOpen}
        toggleModal={togglePassModal}
        selectedId={selectedId}
      />
      <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]' />
      <div className='flex flex-col items-center justify-center gap-6 h-full relative z-40'>
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
          {data.map((item: GameDataType, index: number) => (
            <div
              className='md:bg-slate-400 bg-white hover:bg-white cursor-pointer px-8 py-5 md:py-2 flex flex-col md:flex-row justify-between gap-2 md:gap-5 font-semibold rounded-sm text-lg text-slate-950 hover:text-blue-900 w-screen sm:w-[550px] md:w-[800px] mx-auto'
              key={index}
              onClick={() => {
                setSelectedId(item.id);
                toggleGameActionModal();
              }}
            >
              <div className='flex gap-10 md:gap-5 mx-auto md:w-7/12 justify-center'>
                <div className='flex items-center md:items-start flex-col md:flex-row gap-2 mx-auto md:mx-0 text-md md:text-lg text-center leading-5 w-4/12'>
                  <img
                    className='w-9 h-7 rounded-full object-cover'
                    src={
                      item.player1Country.toLowerCase() === "philippines"
                        ? phflag
                        : item.player1Country.toLowerCase() === "thailand"
                        ? thaiFlag
                        : item.player1Country.toLowerCase() === "korea"
                        ? koreanFlag
                        : item.player1Country.toLowerCase() === "japan"
                        ? jpFlag
                        : unknownFlag
                    }
                    alt=''
                  />
                  {item.player1Name}
                </div>
                vs{" "}
                <div className='flex items-center md:items-start flex-col md:flex-row gap-2 mx-auto md:mx-0 text-md md:text-lg text-center leading-5 w-4/12'>
                  <img
                    className='w-9 h-7 rounded-full object-cover'
                    src={
                      item.player2Country.toLowerCase() === "philippines"
                        ? phflag
                        : item.player2Country.toLowerCase() === "thailand"
                        ? thaiFlag
                        : item.player2Country.toLowerCase() === "korea"
                        ? koreanFlag
                        : item.player2Country.toLowerCase() === "japan"
                        ? jpFlag
                        : unknownFlag
                    }
                    alt=''
                  />
                  {item.player2Name}
                </div>
              </div>
              <div className='w-5/12 flex justify-between'>
                <div className='hidden md:block'>|</div>
                <div className='hidden md:block'>{item.matchDetails}</div>
                <div className='hidden md:block'>|</div>
                <div className='hidden md:block'>Match {item.matchNumber}</div>
                <div className='hidden md:block'>|</div>
                <div className='hidden md:block'>
                  {item.player1Points} / {item.player2Points}
                </div>
              </div>

              <hr className='md:hidden' />
              <div className='flex justify-around w-3/4 sm:w-2/4  mx-auto md:hidden text-sm'>
                <div className='hidden md:block'>|</div>
                <div className='bg-blue-600 text-white px-2 rounded-full'>
                  {item.matchDetails}
                </div>
                <div>Match {item.matchNumber}</div>
                <div className='bg-red-600 text-white px-2 rounded-full'>
                  {item.player1Points} / {item.player2Points}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default AllGames;
