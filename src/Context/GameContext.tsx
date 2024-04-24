import { createContext, useContext } from "react";
import { GameContextType } from "./GameContextProvider";

const GameContext = createContext<GameContextType | undefined>(undefined);

const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }

  return context;
};

export { GameContext, useGameContext };
