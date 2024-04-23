import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";
import { useCourtContext } from "../Context/CourtContext";

const PlayerPointEdit = ({
  color,
  playerNum,
}: {
  color: string;
  playerNum: string;
}) => {
  const { court1Info, updatePlayer1Point, updatePlayer2Point } =
    useCourtContext();
  return (
    <div
      className={`${
        color === "red" ? "bg-red-600" : "bg-blue-600"
      } w-full flex flex-col justify-center items-center md:py-12 lg:py-0`}
    >
      <h1 className='text-[10rem] sm:text-[7rem] md:text-[12rem] lg:text-[16rem] xl:text-[18rem] text-white font-semibold'>
        {playerNum === "1"
          ? court1Info.player1.point
          : court1Info.player2.point}
      </h1>
      <div className='flex'>
        <IoMdArrowDropleftCircle
          onClick={() => {
            playerNum === "1"
              ? updatePlayer1Point("decrement")
              : updatePlayer2Point("decrement");
          }}
          className='text-6xl text-white cursor-pointer'
        />
        <IoMdArrowDroprightCircle
          onClick={() => {
            playerNum === "1"
              ? updatePlayer1Point("increment")
              : updatePlayer2Point("increment");
          }}
          className='text-6xl text-white cursor-pointer'
        />
      </div>
    </div>
  );
};

export default PlayerPointEdit;
