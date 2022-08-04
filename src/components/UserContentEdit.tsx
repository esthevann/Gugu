import { Gugu, User } from "@prisma/client";
import Image from "next/future/image";
import Link from "next/link";
import { Gugus } from "./Gugus";

interface UserContentProps {
    user: User & {
        Gugu: (Gugu & {
            user: User;
            likes: User[];
        })[];
        GugusLiked: (Gugu & { likes: User[]; })[];
    },
}

export default function UserContentEdit(props: UserContentProps) {
    return (
        <div className="flex flex-col flex-1 flex-grow pl-12 ">
            <div className="flex items-center justify-center gap-2 p-6">
                <Image src={props.user.image!} alt={`${props.user.name} profile photo`} 
                    className="w-32 h-32 rounded-full"/>
                <div >
                    <h2 className="text-xl font-bold">{props.user.name} - {props.user.handle}</h2>
                    <p className="w-[52rem] ">{props.user.Bio}</p>
                    <Link href={`/profile/${props.user.handle}/edit`}>
                        <a> Edit </a>
                     </Link>
                </div>
            </div>
            
            <Gugus gugus={props.user.Gugu} likedList={props.user.GugusLiked}/>
        </div>
    )
}