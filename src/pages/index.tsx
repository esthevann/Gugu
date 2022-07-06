import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import Feed from '../components/Feed';
import Rightbar from '../components/Rightbar';
import { Sidebar } from '../components/Sidebar';


const Home: NextPage = () => {
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
