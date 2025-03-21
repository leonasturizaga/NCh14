"use client"

import { BookMarked } from 'lucide-react';
import React, { useState, useMemo, useEffect  } from 'react';
import CardNotas from "../cardNotas"
import { Button } from "@/Components/ui/button"
import { PenLine, Plus, PlusCircle, Mic, Save, CircleStop } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"
import { Input } from '@/Components/ui/input';
import { Label } from "@/Components/ui/label"
import { Textarea } from '@/Components/ui/textarea';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { useToast } from "@/Components/ui/toast";

const notas = [
    {
        noteType: "Preguntas",
        date: "2024-07-19T04:50:00Z",
        description: "¿Cuáles son los efectos secundarios a la larga de mi medicación?",
        mark: "Marcada"
    },
    {
        noteType: "Preguntas",
        date: "2024-07-20T05:50:00Z",
        description: "¿Qué puedo hacer para reducir la hinchazón en las piernas? ¿Es normal tener mareos ocasionales después de tomar mis medicamentos?",
        mark: "Marcada"

    },
    {
        noteType: "Preguntas",
        date: "2024-07-21T02:00:00Z",
        description: "¿Qué alternativas tengo si los efectos secundarios del medicamento son muy molestos? ¿Es seguro hacer ejercicio intenso en mi estado actual? ¿Debería preocuparme por la pérdida de cabello desde que comencé el nuevo tratamiento? ¿Hay alguna vacuna que necesite evitar debido a mi trasplante? ¿Cómo puedo mejorar mi sistema inmunológico de manera segura? ¿Qué debo hacer si olvido una dosis de mi medicamento?",
        mark: "Marcada"

    },
    {
        noteType: "Emociones",
        date: "2024-07-21T03:00:00Z",
        description: "¿Me sentí un poco deprimido hoy. Tal vez debería considerar ajustar mi rutina para incluir más actividades agradables.",
        mark: "Marcada"

    },
    {
        noteType: "Emociones",
        date: "2024-08-05T16:58:00Z",
        description: "Experimenté un episodio de ansiedad ayer. Utilicé técnicas de respiración profunda para calmarme y funcionaron bien.",
        mark: "Marcada"

    },
    {
        noteType: "Emociones",
        date: "2024-08-05T20:32:00Z",
        description: "Experimenté un episodio de ansiedad ayer.",
        mark: "Marcada"

    },
    
    {
        noteType: "Emociones",
        date: "2024-08-05T20:32:29Z",
        description: "Experimenté un episodio de ansiedad a la tarde tambien",
        mark: "Marcada"

    },
]

const initialNotas = [
    {
        noteType: "Preguntas",
        date: "2024-07-19T04:50:00Z",
        description: "¿Cuáles son los efectos secundarios a la larga de mi medicación?",
        mark: "Marcada"
    },
    {
        noteType: "Preguntas",
        date: "2024-07-20T05:50:00Z",
        description: "¿Qué puedo hacer para reducir la hinchazón en las piernas? ¿Es normal tener mareos ocasionales después de tomar mis medicamentos?",
        mark: "Marcada"

    },
    {
        noteType: "Preguntas",
        date: "2024-07-21T02:00:00Z",
        description: "¿Qué alternativas tengo si los efectos secundarios del medicamento son muy molestos? ¿Es seguro hacer ejercicio intenso en mi estado actual? ¿Debería preocuparme por la pérdida de cabello desde que comencé el nuevo tratamiento? ¿Hay alguna vacuna que necesite evitar debido a mi trasplante? ¿Cómo puedo mejorar mi sistema inmunológico de manera segura? ¿Qué debo hacer si olvido una dosis de mi medicamento?",
        mark: "Marcada"

    },
    {
        noteType: "Emociones",
        date: "2024-07-21T03:00:00Z",
        description: "¿Me sentí un poco deprimido hoy. Tal vez debería considerar ajustar mi rutina para incluir más actividades agradables.",
        mark: "Marcada"

    },
    {
        noteType: "Emociones",
        date: "2024-08-05T16:58:00Z",
        description: "Experimenté un episodio de ansiedad ayer. Utilicé técnicas de respiración profunda para calmarme y funcionaron bien.",
        mark: "Marcada"

    },
    {
        noteType: "Emociones",
        date: "2024-08-05T20:49:00Z",
        description: "Experimenté un episodio de ansiedad ayer.",
        mark: "Marcada"

    },
    
    {
        noteType: "Emociones",
        date: "2024-08-05T20:48:15Z",
        description: "Experimenté un episodio de ansiedad a la tarde tambien",
        mark: "Marcada"

    },
];

function ViewNotas() {

    const [notas, setNotas] = useState(initialNotas);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newNote, setNewNote] = useState({ noteType: "", date: "", description: "", mark: "Marcada" });

    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewNote({
            ...newNote,
            [name]: value
        });
    };




    const handleAddNote = () => {
        setNotas([...notas, { ...newNote, date: new Date().toISOString() }]);
        setIsDialogOpen(false);
        setNewNote({ noteType: "", date: "", description: "", mark: "Marcada" });
    };

    const uniqueNoteTypes = [...new Set(notas.map(notas => notas.noteType))];
    const getBadgeClass = (noteType) => {
        switch (noteType) {
            case "Preguntas":
                return "bg-pink-900 text-white";
            case "Emociones":
                return "bg-blue-600 text-white";
            case "Sintomas":
                return "bg-green-400 text-white";
            //    return "'bg-green-500 text-white' : 'bg-green-200'";

            default:
                return "";
        }
    };

    //record
    const { transcript, listening, resetTranscript } = useSpeechRecognition();
    const [isRecording, setIsRecording] = useState(false);

    const startListening = () => {
        setIsRecording(true);
        // SpeechRecognition.startListening({ continuous: true });
        SpeechRecognition.startListening({ continuous: true, language: 'es-ES' });
    };

    const stopListening = () => {
        setIsRecording(false);
        SpeechRecognition.stopListening();
    };

    const saveTranscription = () => {
        handleInputChange({ target: { name: 'description', value: transcript } });
        resetTranscript();
    };


    // UseEffect for showing toast
    useEffect(() => {
        const interval = setInterval(() => {
            notas.forEach(nota => {
                const noteDate = new Date(nota.date);
                const currentDate = new Date();
                const timeDifference = (noteDate - currentDate) / 1000 / 60; // difference in minutes

                if (timeDifference <= 1 && timeDifference > 0) {
                    toast.info(
                        <div>
                            {nota.description}
                            <div>
                                <button onClick={() => toast.dismiss()}>Confirm</button>
                                <button onClick={() => delayAlert(nota)}>Delay</button>
                            </div>
                        </div>,
                        {
                            autoClose: 30000, // 30 seconds
                        }
                    );
                }
            });
        }, 60000); // Check every minute

        return () => clearInterval(interval);
    }, [notas]);

    const confirmAlert = (nota) => {
        // handle confirmation
    };

    const delayAlert = (nota) => {
        const updatedNotas = notas.map(n => {
            if (n === nota) {
                const newDate = new Date(new Date(n.date).getTime() + 60000); // delay by 1 minute
                return { ...n, date: newDate.toISOString() };
            }
            return n;
        });
        setNotas(updatedNotas);
    };

    return (
        <div className='flex bg-white'>
            <div className='bg-secondary p-4'>
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 px-2">
                    {notas.map((nota, index) => (

                        <div key={index} className="mb-4 break-inside-avoid shadow-md rounded-lg ">
                            <CardNotas
                                key={index}
                                noteType={nota.noteType}
                                date={nota.date}
                                description={nota.description}
                                mark={nota.mark}
                            />
                        </div>
                    ))}

                </div>
                <div className=' items-baseline'>
                    <div className="">
                        <Dialog className="">
                            <DialogTrigger asChild>
                                <div>
                                    <Button className="rounded-3xl bg-inputPrimary space-x-4 float-right " >
                                        <PenLine />  <span >Agregar nota</span>
                                    </Button>
                                </div>


                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[328px] md:max-w-[328px] lg:max-w-[328px] gap-2">
                                <DialogHeader>
                                    <DialogTitle>Nueva nota</DialogTitle>
                                    <DialogDescription>
                                        Selecciona una etiqueta
                                    </DialogDescription>
                                </DialogHeader>

                                <div className=' '>
                                    <div className=" ">
                                        <div className='columns-2 sm:columns-2 lg:columns-2'>
                                        {uniqueNoteTypes.map((noteType) => (
                                            <div className='  '>
                                                <Button
                                                    className={` my-1 rounded-sm  h-6 ${getBadgeClass(noteType)} {${newNote.noteType === noteType ? "bg-gray-200 text-lg " : "bg-gray-200"}}`}
                                                    onClick={() => setNewNote({ ...newNote, noteType: noteType })}
                                                >
                                                    {noteType}
                                                </Button>
                                                {/* <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/20 ${getBadgeClass(noteType)}`}> {noteType} </span> */}
                                            </div>
                                        ))}




                                        </div>
                                        <Button variant = "ghost" className="rounded-sm h-6 "><span className='text-green-700 flex underline'>Agregar etiqueta <Plus size={18} className='pt-1' /></span></Button>

                                    </div>
                                </div>
                                <div>
                                    <Label className="block text-sm font-medium mb-2">Detalle
                                    <span className=' flex float-right text-mic space-x-2'>
                                                    {/* <CircleStop stroke='#D92626' /><Mic /><Save /> */}
                                                    {isRecording ? (
                                                        <Button variant="ghost" ><CircleStop stroke='#D92626' onClick={stopListening} /></Button>
                                                    ) : (
                                                        <Button variant="ghost" ><Mic onClick={startListening} /></Button>
                                                    )}
                                                    <Button variant="ghost" ><Save onClick={saveTranscription} /></Button>
                                                </span>
                                            </Label>
                                            <p className='text-xs text-circleStop'>{listening ? 'Escuchando...' : ''}</p>
                                    <Textarea
                                        name="description"
                                        value={newNote.description || transcript}
                                        onChange={handleInputChange}
                                        placeholder="Información sobre el evento"
                                        className=" p-2 border rounded w-full"
                                    />
                                </div>
                                
                                <DialogFooter>
                                    <Button className="rounded-3xl bg-inputPrimary space-x-4 w-full" onClick={handleAddNote}>
                                        <PenLine />  <span >Agregar nota</span>
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default ViewNotas;

