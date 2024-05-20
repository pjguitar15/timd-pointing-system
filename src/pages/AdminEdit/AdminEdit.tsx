// import CenterInfo from "../components/CenterInfo";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { DocumentData } from "@firebase/firestore-types";
import PointBox from "./PointBox";

const GameEdit = () => {
  const [gameItem, setGameItem] = useState<DocumentData | null | undefined>(
    null
  );
  const [matchNum, setMatchNum] = useState<number | undefined>(undefined);
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const params = useParams();
  const [isRunning, setIsRunning] = useState(false);

  // Set deadline once, when the component mounts
  const deadlineRef = useRef(new Date(Date.now() + 2 * 60 * 1000).getTime());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getTime = () => {
    const time = Math.max(deadlineRef.current - Date.now(), 0);

    const totalMinutes = Math.floor(time / 1000 / 60);
    const totalSeconds = Math.floor((time / 1000) % 60);

    setMinutes(totalMinutes);
    setSeconds(totalSeconds);

    if (time === 0) {
      setIsRunning(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current as NodeJS.Timeout);
      }
    }
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(getTime, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current as NodeJS.Timeout);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current as NodeJS.Timeout);
      }
    };
  }, [isRunning]);

  const startTimer = () => {
    if (!isRunning) {
      deadlineRef.current = new Date(
        Date.now() + minutes * 60 * 1000 + seconds * 1000
      ).getTime();
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

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

  const updatePoint = async (
    color: "red" | "blue",
    operation: "add" | "subtract",
    num: number
  ) => {
    if (!params.id) return;

    const gameDocRef = doc(db, "games", params.id);

    try {
      const docSnapshot = await getDoc(gameDocRef);
      if (!docSnapshot.exists()) {
        console.error("Document does not exist");
        return;
      }

      const currentData = docSnapshot.data();
      const pointsField = color === "red" ? "player1Points" : "player2Points";
      const currentPoints = currentData[pointsField] || 0;
      const updatedPoints =
        operation === "add" ? currentPoints + num : currentPoints - num;

      await setDoc(
        gameDocRef,
        { [pointsField]: updatedPoints },
        { merge: true }
      );

      console.log("Document updated successfully!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const updateMatchNum = async (num: number) => {
    if (!params.id) return;
    const chatDocRef = doc(db, "games", params.id); // Reference the document directly by its ID

    try {
      await setDoc(
        chatDocRef,
        { matchNumber: num },
        { merge: true } // Merge with existing document data
      );
      console.log("Document updated successfully!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <main className='h-screen bg-black flex flex-col justify-center'>
      <h1 className='text-white text-center text-[6rem]'>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </h1>
      <div className='flex mx-auto gap-2 items-center'>
        <h3 className='text-white text-xl'>Match</h3>
        <input
          className='bg-slate-200 mx-auto text-center ps-3 py-2 text-4xl border rounded outline-none w-12'
          value={matchNum}
          onChange={(e) => {
            setMatchNum(e.target.value ? parseInt(e.target.value) : undefined);
            updateMatchNum(parseInt(e.target.value));
          }}
          type='number'
        />
      </div>
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
        <button
          onClick={startTimer}
          className='bg-yellow-500 px-4 py-1 rounded font-medium'
        >
          Start Time
        </button>
        <button
          onClick={pauseTimer}
          className='bg-yellow-500 px-4 py-1 rounded font-medium'
        >
          Pause Time
        </button>
        <button className='bg-red-600 px-4 py-1 rounded font-medium text-white'>
          End Game
        </button>
      </div>
      <Link
        to='/all-games'
        className='text-white border rounded-lg px-4 py-2 text-sm mx-auto mt-5'
      >
        Back to Game Select
      </Link>
    </main>
  );
};

export default GameEdit;
