import Image from "next/future/image";
import { format } from 'date-fns'

interface GuguProps {
    img: string,
    content: string,
    createdAt: Date,
    name: string,
    handle: string,
}

export function Gugu(props: GuguProps) {
    const date = format(props.createdAt, 'dd/MM/yyyy')
    return (
        <div className="px-6 py-3 border border-gray-500 rounded-md max-w-fit">
            <div className="flex gap-2">
                <Image src={props.img} alt="Gugu" className="w-12 h-12 rounded-full " />
                <div>
                    <div className="flex gap-2">
                        <h2 className="font-bold"> {props.name}  </h2>
                        <div className="flex gap-1 text-gray-600">
                            <p>@{props.handle}</p>
                            ·
                            <p>{date}</p>
                        </div>

                    </div>

                    <p className="flex-wrap">{props.content}</p>
                </div>

            </div>
        </div>
    )
}