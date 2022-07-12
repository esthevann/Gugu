import { GetServerSideProps } from "next"
import { unstable_getServerSession as getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Rightbar from "../../components/Rightbar";
import { Sidebar } from "../../components/Sidebar";
import { trpc } from "../../utils/trpc";
import { ssg_helper } from '../../utils/ssg-helper';
import { authOptions as nextAuthOptions } from "../api/auth/[...nextauth]";
import UserContent from "../../components/UserContent";


export default function UserPage() {
    const session = useSession();

    const { user } = useRouter().query as { user: string };

    const { data: pageUserData } = trpc.useQuery(["user.getUserByHandle", user]);
    const { data: sessionUserData } = trpc.useQuery(["user.getUserByEmail", session?.data?.user?.email || ""]);

    if (!pageUserData) {
        return null;
    }

    return (
        <>
            <Head>
                <title>{pageUserData?.name} - @{pageUserData.handle}</title>
                <link rel="shortcut icon" href='/favicon.ico?' type="image/x-icon" />
                <meta name="description" content="Gugu microblogging platform" />
            </Head>
            <div className='flex flex-col min-h-screen'>

                <div className='flex flex-grow'>
                    <Sidebar handle={sessionUserData?.handle}/>
                    <UserContent user={pageUserData}/>
                    <Rightbar />
                </div>

            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getServerSession(ctx.req, ctx.res, nextAuthOptions);
    
    let { user } = ctx.query;
    
    
    if (!user) {
        return {
            notFound: true
        }
    }

    if (!session || !session.user?.email) {
        return {
            redirect: {
                destination: '/api/auth/signin',
                permanent: false,
            },
        };
    }

    const ssg = ssg_helper(session);

    let user_data = await ssg.fetchQuery('user.getUserByHandle', user as string);
    console.log(user_data);
    
    
    if (!user_data) {
        return {
            notFound: true
        }
    }
    console.log(2);
    return {
        props: {
            session,
            trpc: ssg.dehydrate(),
        }
    }
}