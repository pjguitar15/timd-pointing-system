import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";
import { useGameContext } from "../Context/GameContext";

const PlayerPointEdit = ({
  color,
  playerNum,
}: {
  color: string;
  playerNum: string;
}) => {
  const { gameInfo, updatePlayer1Point, updatePlayer2Point } = useGameContext();
  return (
    <div
      className={`${
        color === "red" ? "bg-red-600" : "bg-blue-600"
      } w-full flex flex-col justify-center items-center md:py-12 lg:py-0`}
    >
      <h1 className='text-[10rem] sm:text-[7rem] md:text-[12rem] lg:text-[16rem] xl:text-[18rem] text-white font-semibold'>
        {playerNum === "1" ? gameInfo.player1.point : gameInfo.player2.point}
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
