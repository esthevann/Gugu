import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { Session, unstable_getServerSession as getServerSession } from "next-auth";
import { PostForm } from "./PostForm";
import { authOptions as nextAuthOptions } from "../pages/api/auth/[...nextauth]";
import { trpc } from "../utils/trpc";
import { Gugu as GuguType, User } from "@prisma/client";
import { Gugus } from "./Gugus";

export interface FeedProps {
    gugus: (GuguType & {
        user: {
            id: string;
            name: string | null;
            handle: string | null;
            image: string | null;
        };
        likes: number;
    })[] | undefined,
    likedList: (GuguType & {
        likes: User[];
    })[];
}


export default function Feed(props: FeedProps) {
    return (
        <div className="flex flex-col flex-1 flex-grow pl-12 ">
            <div className="flex flex-col items-center pl-12">
                <div className="pb-6"></div>
                <PostForm />
                <div className="pb-6"></div>
            </div>
            <h2 className="text-xl font-bold">Gugus mais recentes</h2>
            <div className="pb-6"></div>
            <Gugus gugus={props.gugus} likedList={props.likedList}/>

        </div>
    )
}


