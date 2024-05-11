import { doc, onSnapshot } from "firebase/firestore";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";

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
  const [thisPass, setThisPass] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isCancel, setIsCancel] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (selectedId)
      onSnapshot(doc(db, "games", selectedId), (doc) => {
        console.log("Current data: ", doc.data());
        const data = doc.data();
        setThisPass(data?.password);
      });
  }, [selectedId]);

  const handleEnterPass = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isCancel) toggleModal();
    if (!passwordInput) return;

    if (passwordInput !== thisPass) {
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
          <h6 className='font-medium'>Game Pass</h6>
          <input
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder='Enter password'
            className={`w-full rounded px-4 py-2 bg-slate-100 border outline-none ${
              errorMessage && "border-red-500"
            } `}
            type='password'
          />

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
          {errorMessage && (
            <p className='text-red-500 text-sm'>{errorMessage}</p>
          )}
        </form>
      </div>
    )
  );
};

export default EnterPassModal;
