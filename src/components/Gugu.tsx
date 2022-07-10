import Image from "next/future/image";
import { format } from 'date-fns'
import Link from "next/link";

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
        <div className="px-6 py-3 border border-gray-500 rounded-md w-96 max-w-[24rem] max-h-fit">
            <div className="flex gap-2">
                <Image src={props.img} alt="Gugu" className="w-12 h-12 rounded-full " />
                <div>
                    <div className="flex gap-2">
                        <Link href={`/profile/${props.handle}`} >
                                <a className="font-bold">{props.name}</a>
                            </Link>
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