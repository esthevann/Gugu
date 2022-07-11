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
        <div>
            <Image src={props.user.image!} alt={`${props.user.name} profile photo`}/>
            <Gugus gugus={props.user.Gugu}/>
        </div>
    )
}