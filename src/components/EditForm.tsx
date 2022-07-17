import { User } from "@prisma/client";
import Image from "next/future/image";
import { useState } from "react";

interface EditFormProps {
    handle: string;
    user: User
}

export default function EditForm(props: EditFormProps) {
    let [name, setName] = useState(props.user.name || "");
    let [bio, setBio] = useState(props.user.Bio || "");

    return (
        <div className="flex flex-col items-center flex-1 flex-grow ">
            <div className="pb-6"></div>
            <h1 className="text-3xl font-bold">Editar perfil</h1>
            <div className="pb-6"></div>
            <div className="flex flex-col gap-9 max-w-fit">
                <div className="flex gap-6">
                    <div>
                        <Image src={props.user.image!} alt={`${props.user.name}'s picture`} className="w-24 h-24" />
                    </div>
                    <form action="" id="editForm" className="flex flex-col justify-center gap-1">
                        <label htmlFor="" className="flex items-center gap-2">
                            <span className="text-gray-700">Nome:&nbsp;&nbsp;</span>
                            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className="p-1 bg-zinc-900" />
                        </label>
                        <label htmlFor="" className="flex items-center gap-2">
                            <span className="text-gray-700">Bio:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <textarea spellCheck={false} name="bio" value={bio} onChange={(e) => setBio(e.target.value)} className="p-1 bg-zinc-900" />
                        </label>
                    </form>

                </div>
                <button type="submit" form="editForm"
                    className="self-center px-4 py-2 transition-colors bg-blue-500 rounded-full hover:bg-blue-600">
                    Editar
                </button>
            </div>
        </div>
    )
}