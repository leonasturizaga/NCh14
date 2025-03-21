import person from "../../assets/iconCardPatient/person.svg";
import card from "../../assets/iconCardPatient/card.svg";
import phone from "../../assets/iconCardPatient/phone.svg";
import mail from "../../assets/iconCardPatient/mail.svg";
import iconButton from "../../assets/iconCardPatient/buttonicon.svg";

function CardPatient({ data, onClick }) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 justify-between border border-[#CFCFD2] p-4 bg-[#F5F5F6] rounded-lg">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-cyan-600 rounded-full"></div>
        <div>
          <p className="text-lg font-semibold">
            {data.firstName} <br /> {data.lastName}
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-2.5 md:gap-4">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-1">
            <img src={person} className="w-5 h-5" alt="gender" />
            <p className="text-base">{data.gender === "F" ? "Femenino (ella), " : "Masculino (él),"}</p>
            <p className="text-base">34 años</p>
          </div>
          <div className="flex items-center gap-1">
            <img src={card} className="w-5 h-5" alt="coverage" />
            <p className="text-base">Cubertura médica:</p>
            <p className="text-base">Omint</p>
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-1">
            <img src={phone} className="w-5 h-5" alt="phone" />
            <p className="text-base">{data.phone}</p>
          </div>
          <div className="flex items-center gap-1">
            <img src={mail} className="w-5 h-5" alt="email" />
            <p className="text-base">{data.email}</p>
          </div>
        </div>
      </div>
      <button
        onClick={onClick}  // Llamar a la función onClick cuando se hace clic en el botón
        className="bg-[#ddeee6] py-2 px-4 rounded-md flex items-center"
      >
        <p className="text-[#2E6D5D] text-base">Ver paciente</p>
        <img src={iconButton} className="ml-2" alt="view patient" />
      </button>
    </div>
  );
}

export default CardPatient;