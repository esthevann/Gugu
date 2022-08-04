import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import Feed from '../components/Feed';
import Rightbar from '../components/Rightbar';
import { Sidebar } from '../components/Sidebar';
import { Session, unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions as nextAuthOptions } from "./api/auth/[...nextauth]";
import { prisma } from '../server/db/client';
import { ssg_helper } from '../utils/ssg-helper';
import { useSession } from "next-auth/react";
import Spinner from "../components/Spinner";
import { useListAllGugus } from "../hooks/useListAllGugus";
import { useGetUserById } from "../hooks/useGetUserById";

interface Props {
  session: Session;
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, nextAuthOptions);

  if (!session || !session.user?.id) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  const isUserFullyRegistered = await prisma.user.findUnique({
    where: {
      id: session.user.id
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
  await ssg.fetchQuery("user.getUserById", session.user.id);

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

  const { data: gugus, isLoading } = useListAllGugus();
  const { data: user, isLoading: isUserLoading } = useGetUserById(session?.data?.user?.id || "");

  return (
    <>
      <Head>
        <title>Gugu</title>
        <link rel="shortcut icon" href='/favicon.ico?' type="image/x-icon" />
        <meta name="description" content="Gugu microblogging platform" />
      </Head>
      <div className='flex flex-col min-h-screen'>

        <div className='flex flex-grow h-full '>
          <Sidebar handle={user?.handle} />
          {isLoading || isUserLoading && <Spinner />}
          {gugus && user && <Feed gugus={gugus} likedList={user.GugusLiked} />}
          <Rightbar />
        </div>

      </div>
    </>
  );
};

export default Home;
