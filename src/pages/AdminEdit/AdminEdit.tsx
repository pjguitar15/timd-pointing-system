// import CenterInfo from "../components/CenterInfo";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { DocumentData } from "@firebase/firestore-types";
import PointBox from "./PointBox";

const GameEdit = () => {
  const [gameItem, setGameItem] = useState<DocumentData | null | undefined>(
    null
  );
  const params = useParams();

  useEffect(() => {
    // Check if params.id exists before subscribing to the document
    if (params.id) {
      const gameDocRef = doc(db, "games", params.id);
      const unsubscribe = onSnapshot(
        gameDocRef,
        { includeMetadataChanges: false },
        (doc) => {
          if (doc.exists()) {
            console.log("Current data: ", doc.data());
            setGameItem(doc.data());
          } else {
            console.log("Document does not exist");
          }
        }
      );

      // Return the cleanup function
      return () => {
        console.log("Cleaning up listener...");
        unsubscribe(); // Unsubscribe from the snapshot listener
      };
    }
  }, [params.id]);

  const updatePoint = async (
    color: "red" | "blue",
    operation: "add" | "subtract",
    num: number
  ) => {
    if (params.id) {
      const gameDocRef = doc(db, "games", params.id);

      try {
        // Get the current document data
        const docSnapshot = await getDoc(gameDocRef);
        if (docSnapshot.exists()) {
          const currentData = docSnapshot.data();
          const currPlayer1Points = currentData.player1Points || 0;
          const currPlayer2Points = currentData.player2Points || 0;

          if (color === "red") {
            if (operation === "add") {
              // Increment player points by 1
              const updatedPlayer1Points = currPlayer1Points + num;
              // Update the document with the new player1Points value
              await setDoc(
                gameDocRef,
                {
                  player1Points: updatedPlayer1Points,
                },
                { merge: true } // Merge with existing document data
              );

              console.log("Document updated successfully!");
            } else {
              // Increment player points by 1
              const updatedPlayer1Points = currPlayer1Points - num;
              // Update the document with the new player1Points value
              await setDoc(
                gameDocRef,
                {
                  player1Points: updatedPlayer1Points,
                },
                { merge: true } // Merge with existing document data
              );

              console.log("Document updated successfully!");
            }
          } else {
            if (operation === "add") {
              // Increment player points by 1
              const updatedPlayer2Points = currPlayer2Points + num;
              // Update the document with the new player1Points value
              await setDoc(
                gameDocRef,
                {
                  player2Points: updatedPlayer2Points,
                },
                { merge: true } // Merge with existing document data
              );

              console.log("Document updated successfully!");
            } else {
              // Decrement player points by 1
              const updatedPlayer2Points = currPlayer2Points - num;
              // Update the document with the new player1Points value
              await setDoc(
                gameDocRef,
                {
                  player2Points: updatedPlayer2Points,
                },
                { merge: true } // Merge with existing document data
              );

              console.log("Document updated successfully!");
            }
          }
        } else {
          console.error("Document does not exist");
        }
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }
  };

  return (
    <main className='h-screen bg-black flex flex-col justify-center'>
      <h1 className='text-white text-center text-[6rem]'>00:00</h1>
      <div className='flex mx-auto'>
        <h3 className='text-white text-xl'>Match</h3>
        <input
          className='bg-transparent text-white mx-auto text-center text-xl border rounded outline-none w-12'
          value={1}
          type='number'
        />
      </div>
      <h5 className='text-white text-center mb-3 mt-8'>
        Tap <span className='text-blue-500'>blue</span>/
        <span className='text-red-500'>red</span> square to add a point
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
        <button className='bg-yellow-500 px-4 py-1 rounded font-medium'>
          Start Time
        </button>
        <button className='bg-yellow-500 px-4 py-1 rounded font-medium'>
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
