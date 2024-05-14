type JuryPointBoxType = {
  color: "red" | "blue";
  points: number;
  name: string;
  playerNum: string;
  updatePoint: (color: "red" | "blue", num: number) => void;
};

const POINT_BUTTONS = ["1", "2", "3"];

const JuryPointBox = ({
  color,
  points,
  name,
  playerNum,
  updatePoint,
}: JuryPointBoxType) => {
  return (
    <div
      className={`px-20 py-12 ${
        color === "blue"
          ? "bg-blue-600 rounded-tr-lg rounded-br-lg"
          : "bg-red-600 rounded-tl-lg rounded-bl-lg"
      }  text-white text-center select-none`}
    >
      <h2 className='text-8xl mb-2'>{points}</h2>
      <h6 className='text-xl font-semibold'>{name}</h6>
      <h6 className='text-white text-xs'>Player {playerNum}</h6>
      <div className='mt-6 flex gap-2 justify-center'>
        {POINT_BUTTONS.map((item, index) => (
          <button
            onClick={() => updatePoint(color, parseInt(item))}
            key={index}
            className={`${
              color === "blue" ? "bg-blue-500" : "bg-red-500"
            } text-white text-4xl px-8 py-6 rounded font-medium hover:shadow-lg`}
          >
            +{item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default JuryPointBox;
