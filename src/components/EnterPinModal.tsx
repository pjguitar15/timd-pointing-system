import { doc, onSnapshot } from "firebase/firestore";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { DocumentData } from "@firebase/firestore-types";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";

const EnterPinModal = ({
  open,
  selectedId,
  toggleModal,
}: {
  open: boolean;
  selectedId: string;
  toggleModal: () => void;
}) => {
  const navigate = useNavigate();
  const [gameDetails, setGameDetails] = useState<DocumentData | undefined>(
    undefined
  );
  const [isCancel, setIsCancel] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [pin, setPin] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
  });
  const [showJuryCode, setShowJuryCode] = useState(false);

  const pin1Ref = useRef<HTMLInputElement>(null);
  const pin2Ref = useRef<HTMLInputElement>(null);
  const pin3Ref = useRef<HTMLInputElement>(null);
  const pin4Ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedId)
      onSnapshot(doc(db, "games", selectedId), (doc) => {
        console.log("Current data: ", doc.data());
        const data = doc.data();
        setGameDetails(data);
      });
  }, [selectedId]);

  const handleEnterPass = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredPin = pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4;
    if (isCancel) toggleModal();
    if (!enteredPin) return;

    if (enteredPin !== gameDetails?.pin) {
      setErrorMessage("Incorrect password");
      return;
    }

    // success action
    setErrorMessage("");
    toggleModal();
    navigate(`/game/edit/${selectedId}`);
  };

  const handlePinChange = (
    value: string,
    field: keyof typeof pin,
    nextFieldRef?: React.RefObject<HTMLInputElement>
  ) => {
    if (value === "" || /^\d$/.test(value)) {
      setPin((prev) => ({ ...prev, [field]: value }));
      if (value && nextFieldRef?.current) {
        nextFieldRef.current.focus();
      }
    }
  };

  return (
    open && (
      <div className='fixed h-screen w-screen inset-0 flex items-center justify-center z-50'>
        <div
          className='bg-black opacity-80 w-full fixed inset-0'
          onClick={toggleModal}
        ></div>
        <form
          onSubmit={handleEnterPass}
          className='bg-white text-black z-50 w-11/12 sm:w-8/12 lg:w-6/12 xl:w-4/12 px-4 md:px-12 py-6 flex flex-col items-center justify-center gap-2 rounded relative'
        >
          <IoCloseOutline
            onClick={toggleModal}
            className='absolute right-2 top-2 text-2xl cursor-pointer'
          />
          <div className='font-medium text-xl'>
            <span className='text-blue-600'>{gameDetails?.player1Name}</span> vs{" "}
            <span className='text-red-600'>{gameDetails?.player2Name}</span>
          </div>

          <div className='flex gap-2 mt-4'>
            <p className='text-xs text-slate-500 font-regular'>
              Enter PIN Code
            </p>
            {pin.pin1 && (
              <>
                {showJuryCode ? (
                  <FaRegEye
                    onClick={() => setShowJuryCode(!showJuryCode)}
                    className='text-slate-500 text-xl cursor-pointer'
                  />
                ) : (
                  <FaRegEyeSlash
                    onClick={() => setShowJuryCode(!showJuryCode)}
                    className='text-slate-500 text-xl cursor-pointer'
                  />
                )}
              </>
            )}
          </div>

          <div className='flex gap-2 sm:w-3/4 h-12 text-2xl'>
            <input
              ref={pin1Ref}
              value={pin.pin1}
              onChange={(e) => handlePinChange(e.target.value, "pin1", pin2Ref)}
              className='py-8 rounded-sm w-full outline-none text-center border bg-slate-100'
              type={showJuryCode ? "text" : "password"}
              maxLength={1}
            />
            <input
              ref={pin2Ref}
              value={pin.pin2}
              onChange={(e) => handlePinChange(e.target.value, "pin2", pin3Ref)}
              className='py-8 rounded-sm w-full outline-none text-center border bg-slate-100'
              type={showJuryCode ? "text" : "password"}
              maxLength={1}
            />
            <input
              ref={pin3Ref}
              value={pin.pin3}
              onChange={(e) => handlePinChange(e.target.value, "pin3", pin4Ref)}
              className='py-8 rounded-sm w-full outline-none text-center border bg-slate-100'
              type={showJuryCode ? "text" : "password"}
              maxLength={1}
            />
            <input
              ref={pin4Ref}
              value={pin.pin4}
              onChange={(e) => handlePinChange(e.target.value, "pin4")}
              className='py-8 rounded-sm w-full outline-none text-center border bg-slate-100'
              type={showJuryCode ? "text" : "password"}
              maxLength={1}
            />
          </div>

          <button
            onSubmit={() => {
              setIsCancel(false);
            }}
            type='submit'
            className='text-sm font-medium bg-yellow-500 px-4 py-2 rounded mt-8 w-3/4'
          >
            Enter
          </button>
          {errorMessage && (
            <p className='text-red-500 text-sm'>{errorMessage}</p>
          )}
        </form>
      </div>
    )
  );
};

export default EnterPinModal;
