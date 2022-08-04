import Image from "next/future/image";
import { format } from 'date-fns'
import Link from "next/link";
import { User } from "@prisma/client";
import { HeartStraight } from "phosphor-react"
import { trpc } from "../utils/trpc";
import React from "react";

interface GuguProps {
    id: string;
    img: string,
    content: string,
    createdAt: Date,
    name: string,
    handle: string,
    likes: User[]
    isLiked: boolean
}

export function Gugu(props: GuguProps) {
    const date = format(props.createdAt, 'dd/MM/yyyy')
    const client = trpc.useContext();
    const liker = trpc.useMutation("gugu.likeGugu");
    const likeGugu: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        liker.mutate(props.id, {
            onSuccess() {
                client.invalidateQueries("gugu.listAllGugus");
            },
        });
    }
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
            <div className="flex justify-end">
                <div className="flex gap-1">
                    <button onClick={likeGugu}>
                        {props.isLiked ? <HeartStraight size={24} weight="fill" /> : <HeartStraight size={24} />}
                    </button>
                    <p>{props.likes.length}</p>
                </div>

            </div>
        </div>
    )
}