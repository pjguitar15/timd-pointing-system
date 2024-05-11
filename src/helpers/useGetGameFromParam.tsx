import { get, ref } from "firebase/database";
import { db } from "../firebase/firebaseConfig";
import { GameDataType } from "../pages/AllGames";
import { useEffect, useState } from "react";

export const useGetGameFromParam = (id: string | undefined) => {
  const [gameItem, setGameItem] = useState<GameDataType | null>(null);
  useEffect(() => {
    const getGame = async () => {
      const dbRef = ref(db, "game");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const data = Object.values(snapshot.val());
        const findGameItem = (data as GameDataType[]).filter(
          (item) => item.gameId === id
        );
        setGameItem(findGameItem[0]);
        console.log(data);
      } else {
        console.log("Error!");
      }
    };
    getGame();
  }, [id]);
  return { gameItem };
};
