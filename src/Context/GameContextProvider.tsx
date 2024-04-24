import React, { useState } from "react";
import { GameContext } from "./GameContext";

export type GameContextType = {
  courtInfo: {
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

const courtInfoInitial = {
  matchDetails: "Enter match details",
  matchNumber: "10",
  player1: { name: "Enter name", country: "Philippines", point: 0 },
  player2: { name: "Enter name", country: "Thailand", point: 0 },
};

const CourtProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [courtInfo, setCourtInfo] = useState(courtInfoInitial);

  const updateMatchDetails = (matchDetails: string) => {
    setCourtInfo((prevCourtInfo) => ({
      ...prevCourtInfo,
      matchDetails,
    }));
  };

  const updateMatchNumber = (matchNumber: string) => {
    setCourtInfo((prevCourtInfo) => ({
      ...prevCourtInfo,
      matchNumber,
    }));
  };

  const updatePlayer1Name = (name: string) => {
    setCourtInfo((prevCourtInfo) => ({
      ...prevCourtInfo,
      player1: {
        ...prevCourtInfo.player1,
        name,
      },
    }));
  };

  const updatePlayer2Name = (name: string) => {
    setCourtInfo((prevCourtInfo) => ({
      ...prevCourtInfo,
      player2: {
        ...prevCourtInfo.player2,
        name,
      },
    }));
  };

  const updatePlayer1Country = (country: string) => {
    setCourtInfo((prevCourtInfo) => ({
      ...prevCourtInfo,
      player1: {
        ...prevCourtInfo.player1,
        country,
      },
    }));
  };

  const updatePlayer2Country = (country: string) => {
    setCourtInfo((prevCourtInfo) => ({
      ...prevCourtInfo,
      player2: {
        ...prevCourtInfo.player2,
        country,
      },
    }));
  };

  const updatePlayer1Point = (action: "increment" | "decrement") => {
    setCourtInfo((prevCourtInfo) => ({
      ...prevCourtInfo,
      player1: {
        ...prevCourtInfo.player1,
        point:
          action === "increment"
            ? prevCourtInfo.player1.point + 1
            : prevCourtInfo.player1.point - 1,
      },
    }));
  };

  const updatePlayer2Point = (action: "increment" | "decrement") => {
    setCourtInfo((prevCourtInfo) => ({
      ...prevCourtInfo,
      player2: {
        ...prevCourtInfo.player2,
        point:
          action === "increment"
            ? prevCourtInfo.player2.point + 1
            : prevCourtInfo.player2.point - 1,
      },
    }));
  };

  const contextValue: GameContextType = {
    courtInfo,
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

export default CourtProvider;
