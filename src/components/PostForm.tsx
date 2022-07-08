import Image from "next/future/image";
import { FormEvent, useState } from "react";
import gugu from "../../public/gugu.png";
import { trpc } from "../utils/trpc";

export function PostForm() {

    const [text, setText] = useState("");
    const utils = trpc.useContext();
    const guguMutation = trpc.useMutation("gugu.createGugu", {onSuccess: (data) => {
        console.log(data);
        //utils.invalidateQueries("gugu");
    }})
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        guguMutation.mutate({ text });
        setText("");
    }
    return (
        <form action="" className="flex flex-col" onSubmit={handleSubmit}>
        <div className="flex flex-col">
            <div className="flex justify-start gap-5">
                <div >
                    <Image src={gugu} alt="" className="w-12 h-12 rounded-full " />
                </div>
                <textarea onChange={(e) => setText(e.target.value)} value={text} spellCheck={false} cols={30} rows={3} maxLength={4} className="p-1.5 bg-zinc-900" name="gugu" />
            </div>
            <div className="pb-2"></div>
            <div className="flex">
                <button className="px-4 py-2 transition-colors bg-blue-500 rounded-full hover:bg-blue-600">
                    Enviar
                </button>
            </div>
        </div>
    </form>
    )
}