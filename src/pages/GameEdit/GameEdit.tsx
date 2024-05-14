// import CenterInfo from "../components/CenterInfo";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { DocumentData } from "@firebase/firestore-types";
import JuryPointBox from "./JuryPointBox";

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

  const updatePoint = async (color: "red" | "blue", num: number) => {
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
      const updatedPoints = currentPoints + num;

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

  return (
    <main className='bg-black min-h-screen flex flex-col justify-center pt-7 pb-12'>
      <div className='flex flex-col w-full sm:w-[540px] mx-auto px-5 sm:px-0 gap-3'>
        <Link
          to='/all-games'
          className='text-white border rounded-lg px-4 py-2 text-sm mx-auto'
        >
          See all games
        </Link>
        <h5 className='text-white text-center mb-3'>
          Tap <span className='text-red-500'>red</span>/
          <span className='text-blue-500'>blue</span> + button to add a point
        </h5>
        <div>
          <JuryPointBox
            color='red'
            points={gameItem?.player1Points}
            name={gameItem?.player1Name}
            playerNum='1'
            updatePoint={updatePoint}
          />
          <JuryPointBox
            color='blue'
            points={gameItem?.player2Points}
            name={gameItem?.player2Name}
            playerNum='2'
            updatePoint={updatePoint}
          />
        </div>
      </div>
    </main>
  );
};

export default GameEdit;
