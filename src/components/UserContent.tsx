import { Gugu, User } from "@prisma/client";
import { Gugus } from "./Gugus";

interface UserContentProps {
    img : string,
    gugus: (Gugu & {
        user: User;
    })[],
}

export default function UserContent(props: UserContentProps) {
    return (
        <div>
            <Gugus gugus={props.gugus}/>
        </div>
    )
}