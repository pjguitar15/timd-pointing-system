// MyProvider.tsx
import React, { useState } from "react";
import { CourtContext } from "./CourtContext";

export type CourtContextType = {
  court1Info: { player1: PlayerType; player2: PlayerType };
  updatePlayer1Name: (name: string) => void;
  updatePlayer2Name: (name: string) => void;
  updatePlayer1Country: (name: string) => void;
  updatePlayer2Country: (name: string) => void;
  updatePlayer1Point: (action: "increment" | "decrement") => void;
  updatePlayer2Point: (action: "increment" | "decrement") => void;
};

type PlayerType = {
  name: string;
  country: string;
  point: number;
};

const court1InfoInitial = {
  player1: { name: "John Doe", country: "Philippines", point: 0 },
  player2: { name: "John Doe", country: "Thailand", point: 0 },
};

const CourtProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [court1Info, setCourt1Info] = useState(court1InfoInitial);

  const updatePlayer1Name = (name: string) => {
    setCourt1Info((prevCourt1Info) => ({
      ...prevCourt1Info,
      player1: {
        ...prevCourt1Info.player1,
        name,
      },
    }));
  };

  const updatePlayer2Name = (name: string) => {
    setCourt1Info((prevCourt1Info) => ({
      ...prevCourt1Info,
      player2: {
        ...prevCourt1Info.player2,
        name,
      },
    }));
  };

  const updatePlayer1Country = (country: string) => {
    setCourt1Info((prevCourt1Info) => ({
      ...prevCourt1Info,
      player1: {
        ...prevCourt1Info.player1,
        country,
      },
    }));
  };

  const updatePlayer2Country = (country: string) => {
    setCourt1Info((prevCourt1Info) => ({
      ...prevCourt1Info,
      player2: {
        ...prevCourt1Info.player2,
        country,
      },
    }));
  };

  const updatePlayer1Point = (action: "increment" | "decrement") => {
    setCourt1Info((prevCourt1Info) => ({
      ...prevCourt1Info,
      player1: {
        ...prevCourt1Info.player1,
        point:
          action === "increment"
            ? prevCourt1Info.player1.point + 1
            : prevCourt1Info.player1.point - 1,
      },
    }));
  };

  const updatePlayer2Point = (action: "increment" | "decrement") => {
    setCourt1Info((prevCourt1Info) => ({
      ...prevCourt1Info,
      player2: {
        ...prevCourt1Info.player2,
        point:
          action === "increment"
            ? prevCourt1Info.player2.point + 1
            : prevCourt1Info.player2.point - 1,
      },
    }));
  };

  const contextValue: CourtContextType = {
    court1Info,
    updatePlayer1Name,
    updatePlayer2Name,
    updatePlayer1Country,
    updatePlayer2Country,
    updatePlayer1Point,
    updatePlayer2Point,
  };

  return (
    <CourtContext.Provider value={contextValue}>
      {children}
    </CourtContext.Provider>
  );
};

export default CourtProvider;
