import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { SetStateAction } from "react";

export const updatePoint = async (
  color: "red" | "blue",
  operation: "add" | "subtract",
  num: number,
  id: string | undefined
) => {
  if (!id) return;

  const gameDocRef = doc(db, "games", id);

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

    await setDoc(gameDocRef, { [pointsField]: updatedPoints }, { merge: true });

    console.log("Document updated successfully!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

export const updateMatchNum = async (num: number, id: string | undefined) => {
  if (!id) return;
  const chatDocRef = doc(db, "games", id); // Reference the document directly by its ID

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

export const getTime = (
  deadlineRef: React.MutableRefObject<number>,
  setMinutes: React.Dispatch<React.SetStateAction<number>>,
  setSeconds: React.Dispatch<React.SetStateAction<number>>,
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>,
  intervalRef: React.MutableRefObject<NodeJS.Timeout | null>
) => {
  const time = Math.max(deadlineRef.current - Date.now(), 0);

  const totalMinutes = Math.floor(time / 1000 / 60);
  const totalSeconds = Math.floor((time / 1000) % 60);

  setMinutes(totalMinutes);
  setSeconds(totalSeconds);

  if (time === 0) {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }
};

export const startTimer = (
  isRunning: boolean,
  deadlineRef: React.MutableRefObject<number>,
  minutes: number,
  seconds: number,
  setIsRunning: React.Dispatch<SetStateAction<boolean>>
) => {
  if (!isRunning) {
    deadlineRef.current = new Date(
      Date.now() + minutes * 60 * 1000 + seconds * 1000
    ).getTime();
    setIsRunning(true);
  }
};

export const pauseTimer = (
  setIsRunning: React.Dispatch<SetStateAction<boolean>>
) => {
  setIsRunning(false);
};
