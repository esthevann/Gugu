import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { Session, unstable_getServerSession as getServerSession } from "next-auth";
import { Gugu } from "./Gugu";
import { PostForm } from "./PostForm";
import { authOptions as nextAuthOptions } from "../pages/api/auth/[...nextauth]";
import { trpc } from "../utils/trpc";
import { Gugu as GuguType, User } from "@prisma/client";

interface FeedProps {
    gugus: (GuguType & {
        user: User;
    })[] | undefined,
}


export default function Feed(props: FeedProps) {
    return (
        <div className="flex flex-col flex-1 pl-12">
            <div className="flex flex-col items-center pl-12">
                <div className="pb-6"></div>
                <PostForm />
                <div className="pb-6"></div>
            </div>
            <h2 className="text-xl font-bold">Gugus mais recentes</h2>
            <div className="pb-6"></div>
            <div className="flex flex-col items-center gap-1">
                {props.gugus && props.gugus.map(gugu => <Gugu 
                key={gugu.id}
                content={gugu.content} createdAt={gugu.createdAt}
                handle={gugu.user.handle!} img={gugu.user.image!}
                name={gugu.user.name!} />)
                }
            </div>

        </div>
    )
}