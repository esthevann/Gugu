import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import Feed from '../components/Feed';
import Rightbar from '../components/Rightbar';
import { Sidebar } from '../components/Sidebar';
import { Session, unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions as nextAuthOptions } from "./api/auth/[...nextauth]";
import { prisma } from '../server/db/client';
import {ssg_helper} from '../utils/ssg-helper';
import { useSession } from "next-auth/react";

interface Props {
  session: Session;
}

// @ts-ignore
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

  if (isUserFullyRegistered?.fullyCreated === false) {
    return {
      redirect: {
        destination: "/auth/new-user",
        permanent: false,
      }
    }
  }


  const ssg = ssg_helper(session);

  await ssg.fetchQuery('gugu.listAllGugus');
  await ssg.fetchQuery("user.getUserByEmail", session.user.email);

  return {
    props: {
      session,
      trpc: ssg.dehydrate(),
    }
  }
}

// @ts-ignore
const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = (props: Props) => {

  const session = useSession();

  const { data: gugus } = trpc.useQuery(["gugu.listAllGugus"]);
  const { data: user } = trpc.useQuery(["user.getUserByEmail", session!.data!.user!.email!]);

  return (
    <>
      <Head>
        <title>Gugu</title>
        <link rel="shortcut icon" href='/favicon.ico?' type="image/x-icon" />
        <meta name="description" content="Gugu microblogging platform" />
      </Head>
      <div className='flex flex-col min-h-screen'>

        <div className='flex flex-grow h-full overflow-hidden'>
          <Sidebar handle={user?.handle}/>
          <Feed gugus={gugus} />
          <Rightbar />
        </div>

      </div>
    </>
  );
};

export default Home;
