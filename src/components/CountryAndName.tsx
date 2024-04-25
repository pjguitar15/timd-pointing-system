import phflag from "../assets/ph-flag.webp";
import jpflag from "../assets/japan.png";
import krflag from "../assets/kr-flag.jpg";
import noFlag from "../assets/no-flag.png";
import thFlag from "../assets/thai.webp";

const CountryAndName = ({
  name,
  color,
  country,
}: {
  name: string | undefined;
  color: "blue" | "red";
  country: string | undefined;
}) => {
  const countryLowered = country?.toLowerCase();
  return (
    <div
      className={`${
        color === "blue" ? "bg-blue-800" : "bg-red-800"
      } w-full flex justify-center items-center gap-4 py-4`}
    >
      <img
        className='h-9 sm:h-12 md:h-16 lg:h-20'
        src={
          countryLowered === "philippines"
            ? phflag
            : countryLowered === "japan"
            ? jpflag
            : countryLowered === "korea" || countryLowered === "south korea"
            ? krflag
            : countryLowered === "thailand"
            ? thFlag
            : noFlag
        }
        alt=''
      />
      <h5 className='text-white text-lg md:text-xl lg:text-3xl'>{name}</h5>
    </div>
  );
};

export default CountryAndName;
