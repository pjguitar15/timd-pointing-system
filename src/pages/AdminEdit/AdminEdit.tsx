// import CenterInfo from "../components/CenterInfo";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { DocumentData } from "@firebase/firestore-types";
import PointBox from "./PointBox";
import { getTime, updatePoint } from "./AdminFunctions";
import TimerAndMatch from "./TimerAndMatch";

const AdminEdit = () => {
  const [gameItem, setGameItem] = useState<DocumentData | null | undefined>(
    null
  );
  const [matchNum, setMatchNum] = useState<number | undefined>(undefined);
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const params = useParams();

  // Set deadline once, when the component mounts
  const deadlineRef = useRef(new Date(Date.now() + 2 * 60 * 1000).getTime());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      const intervalFunction = () => {
        getTime(deadlineRef, setMinutes, setSeconds, setIsRunning, intervalRef);
      };

      intervalRef.current = setInterval(intervalFunction, 1000);

      intervalFunction();
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [
    isRunning,
    deadlineRef,
    setMinutes,
    setSeconds,
    setIsRunning,
    intervalRef,
  ]);

  useEffect(() => {
    if (!params.id) return;

    const gameDocRef = doc(db, "games", params.id);
    const unsubscribe = onSnapshot(gameDocRef, (doc) => {
      if (doc.exists()) {
        console.log("Current data: ", doc.data());
        setGameItem(doc.data());
        setMatchNum(doc.data().matchNumber);
      } else {
        console.log("Document does not exist");
      }
    });

    return () => {
      console.log("Cleaning up listener...");
      unsubscribe();
    };
  }, [params.id]);

  return (
    <main className='h-screen bg-black flex flex-col justify-center'>
      <TimerAndMatch
        minutes={minutes}
        seconds={seconds}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        deadlineRef={deadlineRef}
        setMinutes={setMinutes}
        setSeconds={setSeconds}
        matchNum={matchNum}
        setMatchNum={setMatchNum}
      />
      <h5 className='text-white text-center mb-3 mt-8'>
        Tap <span className='text-red-500'>red</span>/
        <span className='text-blue-500'>blue</span> + and - buttons to
        add/subtract a point
      </h5>
      <div className='flex w-full mx-auto px-5 sm:px-0 justify-center'>
        <PointBox
          color='red'
          points={gameItem?.player1Points}
          name={gameItem?.player1Name}
          playerNum='1'
          updatePoint={updatePoint}
        />
        <PointBox
          color='blue'
          points={gameItem?.player2Points}
          name={gameItem?.player2Name}
          playerNum='2'
          updatePoint={updatePoint}
        />
      </div>
      <div className='flex justify-center mt-5 gap-2'>
        <button className='bg-red-600 px-4 py-1 rounded font-medium text-white'>
          End Game
        </button>
        <Link
          to='/all-games'
          className='border px-4 py-1 rounded font-medium text-white'
        >
          Go Back
        </Link>
      </div>
    </main>
  );
};

export default AdminEdit;
