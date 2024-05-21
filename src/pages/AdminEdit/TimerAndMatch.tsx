import { SetStateAction } from "react";
import { pauseTimer, startTimer, updateMatchNum } from "./AdminFunctions";
import { useParams } from "react-router-dom";

type TimerAndMatchType = {
  minutes: number;
  seconds: number;
  isRunning: boolean;
  setIsRunning: React.Dispatch<SetStateAction<boolean>>;
  deadlineRef: React.MutableRefObject<number>;
  setMinutes: React.Dispatch<SetStateAction<number>>;
  setSeconds: React.Dispatch<SetStateAction<number>>;
  matchNum: number | undefined;
  setMatchNum: React.Dispatch<SetStateAction<number | undefined>>;
};

const TimerAndMatch = ({
  minutes,
  seconds,
  isRunning,
  setIsRunning,
  deadlineRef,
  setMinutes,
  setSeconds,
  matchNum,
  setMatchNum,
}: TimerAndMatchType) => {
  const params = useParams();
  return (
    <div className='flex justify-center gap-12 mb-4'>
      <div>
        <h1 className='text-white text-center text-[6rem]'>
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h1>
        <div className='flex justify-center gap-2'>
          <button
            onClick={() =>
              isRunning
                ? pauseTimer(setIsRunning)
                : startTimer(
                    isRunning,
                    deadlineRef,
                    minutes,
                    seconds,
                    setIsRunning
                  )
            }
            className={`${
              isRunning ? "bg-yellow-500" : "bg-green-500"
            }  px-4 py-1 rounded font-medium text-slate-950`}
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={() => {
              setMinutes(2);
              setSeconds(0);
              setIsRunning(false);
            }}
            className='bg-slate-500 text-white px-4 py-1 rounded font-medium'
          >
            Restart
          </button>
        </div>
      </div>
      <div className='w-1 h-full bg-white'></div>
      <div className='flex flex-col gap-2 items-center mt-8 justify-center'>
        <input
          className='bg-slate-200 text-center ps-3 py-2 text-7xl border rounded outline-none w-20 mx-0'
          value={matchNum}
          onChange={(e) => {
            setMatchNum(e.target.value ? parseInt(e.target.value) : undefined);
            updateMatchNum(parseInt(e.target.value), params.id);
          }}
          type='number'
        />
        <h3 className='text-white text-lg'>Match</h3>
      </div>
    </div>
  );
};

export default TimerAndMatch;
