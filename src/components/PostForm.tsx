import Image from "next/future/image";
import gugu from "../../public/gugu.png";

export function PostForm() {
    return (
        <form action="" className="flex flex-col">
        <div className="flex flex-col">
            <div className="flex justify-start gap-5">
                <div >
                    <Image src={gugu} alt="" className="w-12 h-12 rounded-full " />
                </div>
                <textarea spellCheck={false} cols={30} rows={3} maxLength={4} className="bg-zinc-900" name="gugu" />
            </div>
            <div className="pb-2"></div>
            <div className="flex">
                <button className="px-4 py-2 bg-blue-500 rounded-full">
                    Enviar
                </button>
            </div>
        </div>
    </form>
    )
}