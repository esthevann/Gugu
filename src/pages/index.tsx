import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import Feed from '../components/Feed';
import Rightbar from '../components/Rightbar';
import { Sidebar } from '../components/Sidebar';
import { Session, unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions as nextAuthOptions } from "./api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { Gugu, User } from "@prisma/client";
import { createSSGHelpers } from '@trpc/react/ssg';
import { appRouter } from "../server/router";
import  superjson  from 'superjson';
import { prisma } from '../server/db/client';

interface Props  {
  session: Session;
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, nextAuthOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      }
    }
  }

  const ssg = createSSGHelpers({
    router: appRouter,
    // @ts-ignore
    ctx: {
      session: session,
      prisma,
    },
    transformer: superjson,
  });

   await ssg.fetchQuery('gugu.listAllGugus')

  return {
    props: {
      session,
      trpc: ssg.dehydrate(),
    }
  }
}

// @ts-ignore
const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = (props: Props) => {

  const { data: gugus } = trpc.useQuery(["gugu.listAllGugus"]);


  return (
    <>
      <Head>
        <title>Gugu</title>
        <link rel="shortcut icon" href='/favicon.ico?' type="image/x-icon" />
        <meta name="description" content="Gugu microblogging platform" />
      </Head>
      <div className='flex flex-col min-h-screen'>

        <div className='flex flex-grow'>
          <Sidebar />
          <Feed gugus={gugus} />
          <Rightbar />
        </div>

      </div>
    </>
  );
};

export default Home;
