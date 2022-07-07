import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import Feed from '../components/Feed';
import Rightbar from '../components/Rightbar';
import { Sidebar } from '../components/Sidebar';
import { Session, unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions as nextAuthOptions } from "./api/auth/[...nextauth]";
import { useSession } from "next-auth/react";

// @ts-ignore
export const getServerSideProps: GetServerSideProps<Session> = async (context) => {
    const session = await getServerSession(context.req, context.res, nextAuthOptions);

    if (!session) {
      return {
        redirect: {
          destination: "/api/auth/signin",
          permanent: false,
        }
      }
      
    }

    return {
      props: {
        session
      }
    }
}

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {

  const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);
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
          <Feed />
          <Rightbar />
      </div>
      
    </div>
    </>
  );
};

export default Home;
