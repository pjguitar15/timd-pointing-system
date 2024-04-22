import { createContext, useContext } from "react";
import { CourtContextType } from "./CourtContextProvider";

const CourtContext = createContext<CourtContextType | undefined>(undefined);

const useCourtContext = (): CourtContextType => {
  const context = useContext(CourtContext);

  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }

  return context;
};

export { CourtContext, useCourtContext };
