import Head from "next/head";
import { FormEvent, useState } from "react";
import { trpc } from "../../utils/trpc";
import { useRouter } from 'next/router';
import { GetServerSideProps } from "next";
import { authOptions as nextAuthOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { prisma } from '../../server/db/client';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, nextAuthOptions);

    if (!session || !session.user?.email) {
        return {
          redirect: {
            destination: '/api/auth/signin',
            permanent: false,
          },
        };
      }
    const isUserFullyRegistered = await prisma.user.findUnique({
        where: {
          email: session.user.email
        },
        select: {
          fullyCreated: true
        }
      });
    
      if (isUserFullyRegistered?.fullyCreated === true) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          }
        }
      }
    return {
        props: {}
    }

}

export default function NewUser() {
    const [text, setText] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const addHandleMutation = trpc.useMutation("user.addHandle", {
        onSuccess: () => {
            refreshData();
        }
    });

    const refreshData = () => {
        router.replace(router.asPath);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        addHandleMutation.mutate(text);
        if (addHandleMutation.error?.data?.code === 'CONFLICT') {
            setError("Handle already exists");
        }
        setText("");
    }
    return (
        <div className="flex flex-col min-h-screen">
            <Head>
                <title>Complete seu perfil - Gugu</title>
            </Head>
            <form action="" onSubmit={handleSubmit}>
                <div className="flex flex-col items-center">
                    <div className="pb-6"></div>
                    <h1 className="text-3xl font-bold">Complete o seu perfil</h1>
                    <div className="pb-6"></div>
                    <p>Escolha um identificador</p>
                    <div className="pb-4"></div>
                    <label htmlFor="" className="flex items-center gap-2">
                        Identificador:
                        <input type="text" className="p-1 bg-zinc-900" value={`@${text}`} onChange={(e) => setText(e.target.value.slice(1))} />
                    </label>
                    <div className="pb-4"></div>
                    <button disabled={addHandleMutation.isLoading} type="submit" className="px-4 py-2 transition-colors bg-blue-500 rounded-full hover:bg-blue-600"> Enviar </button>
                    <div className="pb-4"></div>
                    {error && <p className="text-red-500">{error}</p>}
                </div>
            </form>
        </div>
    );
}