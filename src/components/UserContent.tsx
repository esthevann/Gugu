import { Gugu, User } from "@prisma/client";
import Image from "next/future/image";
import { Gugus } from "./Gugus";

interface UserContentProps {
    user: User & {
        Gugu: (Gugu & {
            user: User;
        })[];
    },
}

export default function UserContent(props: UserContentProps) {
    return (
        <div className="flex flex-col flex-1 flex-grow pl-12 ">
            <div className="flex items-center justify-center gap-2 p-6">
                <Image src={props.user.image!} alt={`${props.user.name} profile photo`} 
                    className="w-32 h-32 rounded-full"/>
                <div >
                    <h2 className="text-xl font-bold">{props.user.name} - {props.user.handle}</h2>
                    <p className="w-[52rem] ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum officiis sapiente voluptas facere accusantium fugiat cumque est, minus nostrum soluta optio hic expedita. Mollitia, dolore vitae ducimus at dolores necessitatibus.</p>
                </div>
            </div>
            
            <Gugus gugus={props.user.Gugu}/>
        </div>
    )
}