// import CenterInfo from "../components/CenterInfo";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { DocumentData } from "@firebase/firestore-types";

const GameEdit = () => {
  const [gameItem, setGameItem] = useState<DocumentData | null | undefined>(
    null
  );
  const params = useParams();

  useEffect(() => {
    if (params.id)
      onSnapshot(doc(db, "games", params.id), (doc) => {
        console.log("Current data: ", doc.data());
        setGameItem(doc.data());
      });
  }, []);
  return (
    <main className='h-screen bg-black flex flex-col justify-center'>
      <div className='absolute top-6 w-full flex justify-center'>
        <Link
          to='/all-games'
          className='text-white border rounded-lg px-4 py-2 text-sm'
        >
          See all games
        </Link>
      </div>
      <div className='flex flex-col w-full sm:w-[540px] mx-auto px-5 sm:px-0'>
        <h5 className='text-white text-center mb-3'>
          Tap <span className='text-blue-500'>blue</span>/
          <span className='text-red-500'>red</span> square to add a point
        </h5>
        <div className='p-7 bg-blue-600 text-white text-center cursor-pointer rounded-tl-lg rounded-tr-lg'>
          <h2 className='text-8xl mb-2'>{gameItem?.player1Points}</h2>
          <h6 className='text-xl font-semibold'>{gameItem?.player1Name}</h6>
          <h6 className='text-white text-xs'>Player 1</h6>
        </div>
        <div className='p-7 bg-red-600 text-white text-center cursor-pointer rounded-bl-lg rounded-br-lg'>
          <h2 className='text-8xl mb-2'>{gameItem?.player2Points}</h2>
          <h6 className='text-xl font-semibold'>{gameItem?.player2Name}</h6>
          <h6 className='text-white text-xs'>Player 2</h6>
        </div>
      </div>
    </main>
  );
};

export default GameEdit;
