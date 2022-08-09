import { Gugu, User } from "@prisma/client";
import Image from "next/future/image";
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

export default function UserContent(props: UserContentProps) {
    const gugusCorrectShape = props.user.Gugu.map((gugu) => {
        return {
            id: gugu.id,
            content: gugu.content,
            createdAt: gugu.createdAt,
            likes: gugu.likes.length,
            userId: gugu.userId,
            user: {
                id: gugu.user.id,
                name: gugu.user.name,
                handle: gugu.user.handle,
                image: gugu.user.image,
            }
        }
    });
    return (
        <div className="flex flex-col flex-1 flex-grow pl-12 ">
            <div className="flex items-center justify-center gap-2 p-6">
                <Image src={props.user.image!} alt={`${props.user.name} profile photo`} 
                    className="w-32 h-32 rounded-full"/>
                <div >
                    <h2 className="text-xl font-bold">{props.user.name} - @{props.user.handle}</h2>
                    <p className="w-[52rem] ">{props.user.Bio}</p>
                </div>
            </div>
            
            <Gugus gugus={gugusCorrectShape} likedList={props.user.GugusLiked} />
        </div>
    )
}