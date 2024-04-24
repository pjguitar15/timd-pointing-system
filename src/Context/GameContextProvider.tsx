import React, { useState } from "react";
import { GameContext } from "./GameContext";

export type GameContextType = {
  gameInfo: {
    matchDetails: string;
    matchNumber: string;
    player1: PlayerType;
    player2: PlayerType;
  };
  updatePlayer1Name: (name: string) => void;
  updatePlayer2Name: (name: string) => void;
  updatePlayer1Country: (name: string) => void;
  updatePlayer2Country: (name: string) => void;
  updatePlayer1Point: (action: "increment" | "decrement") => void;
  updatePlayer2Point: (action: "increment" | "decrement") => void;
  updateMatchDetails: (matchDetails: string) => void;
  updateMatchNumber: (matchDetails: string) => void;
};

type PlayerType = {
  name: string;
  country: string;
  point: number;
};

const gameInfoInitial = {
  matchDetails: "Enter match details",
  matchNumber: "10",
  player1: { name: "Enter name", country: "Philippines", point: 0 },
  player2: { name: "Enter name", country: "Thailand", point: 0 },
};

const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gameInfo, setGameInfo] = useState(gameInfoInitial);

  const updateMatchDetails = (matchDetails: string) => {
    setGameInfo((prevGameInfo) => ({
      ...prevGameInfo,
      matchDetails,
    }));
  };

  const updateMatchNumber = (matchNumber: string) => {
    setGameInfo((prevGameInfo) => ({
      ...prevGameInfo,
      matchNumber,
    }));
  };

  const updatePlayer1Name = (name: string) => {
    setGameInfo((prevGameInfo) => ({
      ...prevGameInfo,
      player1: {
        ...prevGameInfo.player1,
        name,
      },
    }));
  };

  const updatePlayer2Name = (name: string) => {
    setGameInfo((prevGameInfo) => ({
      ...prevGameInfo,
      player2: {
        ...prevGameInfo.player2,
        name,
      },
    }));
  };

  const updatePlayer1Country = (country: string) => {
    setGameInfo((prevGameInfo) => ({
      ...prevGameInfo,
      player1: {
        ...prevGameInfo.player1,
        country,
      },
    }));
  };

  const updatePlayer2Country = (country: string) => {
    setGameInfo((prevGameInfo) => ({
      ...prevGameInfo,
      player2: {
        ...prevGameInfo.player2,
        country,
      },
    }));
  };

  const updatePlayer1Point = (action: "increment" | "decrement") => {
    setGameInfo((prevGameInfo) => ({
      ...prevGameInfo,
      player1: {
        ...prevGameInfo.player1,
        point:
          action === "increment"
            ? prevGameInfo.player1.point + 1
            : prevGameInfo.player1.point - 1,
      },
    }));
  };

  const updatePlayer2Point = (action: "increment" | "decrement") => {
    setGameInfo((prevGameInfo) => ({
      ...prevGameInfo,
      player2: {
        ...prevGameInfo.player2,
        point:
          action === "increment"
            ? prevGameInfo.player2.point + 1
            : prevGameInfo.player2.point - 1,
      },
    }));
  };

  const contextValue: GameContextType = {
    gameInfo,
    updatePlayer1Name,
    updatePlayer2Name,
    updatePlayer1Country,
    updatePlayer2Country,
    updatePlayer1Point,
    updatePlayer2Point,
    updateMatchDetails,
    updateMatchNumber,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export default GameProvider;
