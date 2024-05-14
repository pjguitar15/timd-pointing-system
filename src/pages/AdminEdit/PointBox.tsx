type PointBoxType = {
  color: "red" | "blue";
  points: number;
  name: string;
  playerNum: string;
  updatePoint: (
    color: "red" | "blue",
    operation: "add" | "subtract",
    num: number
  ) => void;
};

const POINT_BUTTONS = ["-2", "-1", "+1", "+2"];

const PointBox = ({
  color,
  points,
  name,
  playerNum,
  updatePoint,
}: PointBoxType) => {
  return (
    <div
      className={`p-20 ${
        color === "blue"
          ? "bg-blue-600 rounded-tr-lg rounded-br-lg"
          : "bg-red-600 rounded-tl-lg rounded-bl-lg"
      }  text-white text-center select-none`}
    >
      <h2 className='text-8xl mb-2'>{points}</h2>
      <h6 className='text-xl font-semibold'>{name}</h6>
      <h6 className='text-white text-xs'>Player {playerNum}</h6>
      <div className='mt-6 flex gap-1 justify-center'>
        {POINT_BUTTONS.map((item, index) => (
          <button
            onClick={() =>
              updatePoint(
                color,
                item.slice(0, 1) === "+" ? "add" : "subtract",
                item.slice(1) === "1" ? 1 : 2
              )
            }
            key={index}
            className={`${
              color === "blue" ? "bg-blue-500" : "bg-red-500"
            } text-white text-lg px-4 py-1 rounded font-medium hover:shadow-lg`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PointBox;
