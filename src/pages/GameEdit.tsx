// import CenterInfo from "../components/CenterInfo";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
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
  }, []);

  const addPoint = async (color: "red" | "blue") => {
    if (params.id) {
      const gameDocRef = doc(db, "games", params.id);

      try {
        // Get the current document data
        const docSnapshot = await getDoc(gameDocRef);
        if (docSnapshot.exists()) {
          const currentData = docSnapshot.data();
          const currPlayer1Points = currentData.player1Points || 0;
          const currPlayer2Points = currentData.player2Points || 0;

          if (color === "blue") {
            // Increment player points by 1
            const updatedPlayer1Points = currPlayer1Points + 1;
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
            const updatedPlayer2Points = currPlayer2Points + 1;
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
        <div
          onClick={() => addPoint("blue")}
          className='p-20 bg-blue-600 text-white text-center cursor-pointer rounded-tl-lg rounded-tr-lg select-none'
        >
          <h2 className='text-8xl mb-2'>{gameItem?.player1Points}</h2>
          <h6 className='text-xl font-semibold'>{gameItem?.player1Name}</h6>
          <h6 className='text-white text-xs'>Player 1</h6>
        </div>
        <div
          onClick={() => addPoint("red")}
          className='p-20 bg-red-600 text-white text-center cursor-pointer rounded-bl-lg rounded-br-lg select-none'
        >
          <h2 className='text-8xl mb-2'>{gameItem?.player2Points}</h2>
          <h6 className='text-xl font-semibold'>{gameItem?.player2Name}</h6>
          <h6 className='text-white text-xs'>Player 2</h6>
        </div>
      </div>
    </main>
  );
};

export default GameEdit;
