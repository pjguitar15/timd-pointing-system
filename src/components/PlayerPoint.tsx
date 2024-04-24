import { useGameContext } from "../Context/GameContext";

const PlayerPoint = ({
  color,
  playerNum,
}: {
  color: string;
  playerNum: "1" | "2";
}) => {
  const { gameInfo } = useGameContext();
  return (
    <div
      className={`${
        color === "red" ? "bg-red-600" : "bg-blue-600"
      } w-full flex justify-center items-center md:py-12 lg:py-0`}
    >
      <h1 className='text-[10rem] sm:text-[7rem] md:text-[12rem] lg:text-[16rem] xl:text-[18rem] text-white font-semibold'>
        {playerNum === "1" ? gameInfo.player1.point : gameInfo.player2.point}
      </h1>
    </div>
  );
};

export default PlayerPoint;
