import { useCourtContext } from "../Context/CourtContext";

const PlayerPoint = ({
  color,
  playerNum,
}: {
  color: string;
  playerNum: "1" | "2";
}) => {
  const { courtInfo } = useCourtContext();
  return (
    <div
      className={`${
        color === "red" ? "bg-red-600" : "bg-blue-600"
      } w-full flex justify-center items-center md:py-12 lg:py-0`}
    >
      <h1 className='text-[10rem] sm:text-[7rem] md:text-[12rem] lg:text-[16rem] xl:text-[18rem] text-white font-semibold'>
        {playerNum === "1"
          ? courtInfo.player1.point
          : courtInfo.player2.point}
      </h1>
    </div>
  );
};

export default PlayerPoint;
