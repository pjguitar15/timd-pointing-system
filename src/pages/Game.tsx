import { useEffect, useState } from "react";
import CenterInfo from "../components/CenterInfo";
import CountryAndName from "../components/CountryAndName";
import Header from "../components/Header";
import PlayerPoint from "../components/PlayerPoint";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { DocumentData } from "@firebase/firestore-types";

const Game = () => {
  const [gameItem, setGameItem] = useState<DocumentData | null | undefined>(
    null
  );
  const params = useParams();
  useEffect(() => {
    if (params.id) {
      onSnapshot(doc(db, "games", params.id), (doc) => {
        console.log("Current data: ", doc.data());
        if (doc.data()) setGameItem(doc.data());
      });
    }
  }, [params.id]);

  useEffect(() => {
    console.log(params.id);
  }, [params]);
  return (
    <main className='h-screen bg-black flex flex-col'>
      <Header />
      <div className='lg:flex justify-between'>
        <CountryAndName
          name={gameItem?.player1Name}
          color='red'
          country={gameItem?.player1Country}
        />
        <CountryAndName
          name={gameItem?.player2Name}
          color='blue'
          country={gameItem?.player2Country}
        />
      </div>
      <div className='md:flex justify-center h-full'>
        <PlayerPoint
          color='red'
          points={gameItem?.player1Points}
        />
        <div className='hidden md:flex'>
          <CenterInfo
            matchNumber={gameItem?.matchNumber}
            timeStatus={gameItem?.timeStatus}
          />
        </div>
        <PlayerPoint
          color='blue'
          points={gameItem?.player2Points}
        />
        <div className='flex md:hidden'>
          <CenterInfo
            matchNumber={gameItem?.matchNumber}
            timeStatus={gameItem?.timeStatus}
          />
        </div>
      </div>
    </main>
  );
};

export default Game;
