import { doc, onSnapshot } from "firebase/firestore";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { DocumentData } from "@firebase/firestore-types";

const EnterPassModal = ({
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
  const [passwordInput, setPasswordInput] = useState("");
  const [isCancel, setIsCancel] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    if (isCancel) toggleModal();
    if (!passwordInput) return;

    if (passwordInput !== gameDetails?.password) {
      setErrorMessage("Incorrect password");
      return;
    }

    // success action
    setErrorMessage("");
    toggleModal();
    navigate(`/game/edit/${selectedId}`);
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
          className='bg-white text-black z-50 w-3/4 sm:w-8/12 lg:w-6/12 xl:w-4/12 px-12 py-6 flex flex-col items-center justify-center gap-2 rounded'
        >
          <div className='font-medium'>
            <span className='text-blue-600'>{gameDetails?.player1Name}</span> vs{" "}
            <span className='text-red-600'>{gameDetails?.player2Name}</span>
          </div>
          <input
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder='Enter password'
            className={`w-full rounded px-4 py-2 bg-slate-100 border outline-none ${
              errorMessage && "border-red-500"
            } `}
            type='password'
          />

          <div className='flex flex-col sm:flex-row w-full gap-2'>
            <button
              onSubmit={() => {
                setIsCancel(false);
              }}
              type='submit'
              className='text-sm font-medium bg-yellow-500 px-4 py-2 rounded w-full'
            >
              Enter
            </button>
            <button
              onClick={() => {
                setIsCancel(true);
              }}
              type='submit'
              className='text-sm font-medium border border-yellow-500 text-yellow-600 px-4 py-2 rounded w-full'
            >
              Cancel
            </button>
          </div>
          {errorMessage && (
            <p className='text-red-500 text-sm'>{errorMessage}</p>
          )}
        </form>
      </div>
    )
  );
};

export default EnterPassModal;
