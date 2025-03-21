// import { Button } from "react-scroll";
import {
  Pin,
  PinOff,
  PenLine,
  Files,
  CopyPlus,
  Upload,
  FolderArchive,
  Tag,
  Plus,
  Trash2
} from "lucide-react"

import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react"

import { Button } from "@/Components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { formatDate } from "date-fns"




const CardTratamientos = ({ noteType, date, instructions, status, name, dose, via, frequency, duration }) => {


  const getBadgeClass = (noteType) => {
    switch (noteType) {
      case "Medicacion Esencial":
        return " bg-greenBadge text-blackCardTitle";
      case "Tratamiento complementario":
        return "bg-yellowBadge text-blackCardTitle";
      case "Otras indicaciones":
        return "bg-purple-500 text-blackCardTitle";
        case "Sintomas":
          return "bg-blue-300 text-blackCardTitle";
      default:
        return "";
    }
  };

  const formatDate = (date) => {
    const date2 = new Date(date);
    return new Intl.DateTimeFormat('es-ES', {
      // hour: 'numeric',
      // minute: '2-digit',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date2);
  };


  return (
    <div className='flex justify-center items-center'>

      <div className='flex bg-white flex-col justify-center  w-full h-11/12   border border-solid border-borderCard rounded-lg py-4 px-4'>
        <div className='flex  '  >
          <div className=' w-full space-x-4'>
            <h1 className='text-lg font-semibold text-blackCardTitle py-2'>{name}</h1>

          </div>

          <>
            <DropdownMenu >
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost" className="rounded-sm h-6" >...</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                {/* <DropdownMenuSeparator /> */}
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <PenLine className="mr-2 h-4 w-4" />
                    <span>Crear Notificación</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span>Agregar reposicion</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FolderArchive className="mr-2 h-4 w-4" />
                    <span>Archivar</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

              </DropdownMenuContent>
            </DropdownMenu>
          </>

        </div>
        <div className=' flex-col'>
          {/* <Button size="sm" className={`rounded-sm  h-6 ${getBadgeClass(noteType)}`} Type="submit">{noteType}</Button> */}
          <p className='flex ' >  {noteType}</p>
          <p className='text-sm font text-blackCardText'>
            Dosis: {`${ dose + " via " + via + " cada " + frequency + " hrs," + " por " + duration + " dias."}`}
            {/* Dosis: {dose} */}
          </p>
          <p className='text-sm font text-blackCardText'>
            {/* Instrucciones: {instructions} */}
            Instrucciones: {instructions}
          </p>
          <p className='text-sm font text-blackCardText'>
            Proxima Reposicion: {(formatDate(date))}
          </p>
        </div>
      </div>
    </div >
  );
};

export default CardTratamientos;