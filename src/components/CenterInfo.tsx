import { useState, useEffect, useRef } from "react";

const CenterInfo = ({
  matchNumber,
  timeStatus,
}: {
  matchNumber: number | undefined;
  timeStatus: string;
}) => {
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const updateTimer = () => {
    setSeconds((prevSeconds) => {
      if (prevSeconds === 0) {
        if (minutes === 0) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        setMinutes((prevMinutes) => prevMinutes - 1);
        return 59;
      }
      return prevSeconds - 1;
    });
  };

  useEffect(() => {
    if (timeStatus === "on-going") {
      if (!intervalRef.current) {
        intervalRef.current = setInterval(updateTimer, 1000);
      }
      updateTimer(); // Call updateTimer immediately to remove delay
    } else if (timeStatus === "paused") {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } else if (timeStatus === "reset") {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setMinutes(2);
      setSeconds(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timeStatus]);

  // Ensure timer stops exactly at 00:00
  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [minutes, seconds]);

  return (
    <main className='lg:w-[500px] bg-black px-12 flex flex-row md:flex-col items-center justify-center gap-16 w-full py-5'>
      <div className='flex flex-col gap-1 lg:gap-4 items-center py-5'>
        <h2 className='text-white text-2xl lg:text-5xl'>Match</h2>
        <h2 className='text-white text-7xl lg:text-9xl font-semibold'>
          {matchNumber}
        </h2>
      </div>
      <div className='flex flex-col gap-1 lg:gap-4 items-center'>
        <h2 className='text-white text-2xl lg:text-5xl'>Time</h2>
        <h2 className='text-white text-7xl lg:text-9xl font-semibold'>
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h2>
      </div>
    </main>
  );
};

export default CenterInfo;
