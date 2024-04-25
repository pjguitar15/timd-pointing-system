import { useEffect, useState } from "react";
import CenterInfo from "../components/CenterInfo";
import CountryAndName from "../components/CountryAndName";
import Header from "../components/Header";
import PlayerPoint from "../components/PlayerPoint";
import { get, ref } from "firebase/database";
import { db } from "../firebase/firebaseConfig";
import { useParams } from "react-router-dom";
import { GameDataType } from "./AllGames";

const Game = () => {
  const [gameItem, setGameItem] = useState<GameDataType | null>(null);
  const params = useParams();
  useEffect(() => {
    const getData = async () => {
      const dbRef = ref(db, "game");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const data = Object.values(snapshot.val());
        const findGameItem = (data as GameDataType[]).filter(
          (item) => item.gameId === params.id
        );
        setGameItem(findGameItem[0]);
        console.log(data);
      } else {
        console.log("Error!");
      }
    };
    getData();
  }, []);

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
          <CenterInfo matchNumber={gameItem?.matchNumber} />
        </div>
        <PlayerPoint
          color='blue'
          points={gameItem?.player2Points}
        />
        <div className='flex md:hidden'>
          <CenterInfo matchNumber={gameItem?.matchNumber} />
        </div>
      </div>
    </main>
  );
};

export default Game;
