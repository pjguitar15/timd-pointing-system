import phflag from "../assets/ph-flag.webp";
import jpflag from "../assets/japan.png";
import krflag from "../assets/kr-flag.jpg";
import noFlag from "../assets/no-flag.png";
import thFlag from "../assets/thai.webp";
import { useState } from "react";
import UpdateCountryModal from "./UpdateCountryModal";
import { useCourtContext } from "../Context/CourtContext";

const CountryAndNameEdit = ({
  playerNum,
  color,
}: {
  playerNum: "1" | "2";
  color: "blue" | "red";
}) => {
  const { courtInfo, updatePlayer1Name, updatePlayer2Name } =
    useCourtContext();
  const [open, setOpen] = useState(false);
  const country =
    playerNum === "1" ? courtInfo.player1.country : courtInfo.player2.country;
  const countryLowered = country.toLowerCase();

  const toggle = () => {
    setOpen(!open);
  };
  return (
    <div
      className={`${
        color === "blue" ? "bg-blue-800" : "bg-red-800"
      } w-full flex justify-center items-center gap-4 py-4`}
    >
      <UpdateCountryModal
        open={open}
        toggle={toggle}
        player={playerNum}
      />
      <img
        onClick={() => setOpen(true)}
        className='h-9 sm:h-12 md:h-16 lg:h-20 cursor-pointer hover:scale-105 transition duration-300'
        src={
          countryLowered === "philippines"
            ? phflag
            : countryLowered === "japan"
            ? jpflag
            : countryLowered === "korea" || countryLowered === "south korea"
            ? krflag
            : countryLowered === "thailand"
            ? thFlag
            : noFlag
        }
        alt=''
      />
      <input
        value={
          playerNum === "1" ? courtInfo.player1.name : courtInfo.player2.name
        }
        onChange={(e) =>
          playerNum === "1"
            ? updatePlayer1Name(e.target.value)
            : updatePlayer2Name(e.target.value)
        }
        className='text-white text-lg md:text-xl lg:text-3xl bg-transparent outline-white outline-2'
        type='text'
      />
    </div>
  );
};

export default CountryAndNameEdit;
