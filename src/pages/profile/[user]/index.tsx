import { GetServerSideProps } from "next"
import { unstable_getServerSession as getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Rightbar from "../../../components/Rightbar";
import { Sidebar } from "../../../components/Sidebar";
import { ssg_helper } from '../../../utils/ssg-helper';
import { authOptions as nextAuthOptions } from "../../api/auth/[...nextauth]";
import UserContent from "../../../components/UserContent";
import Spinner from "../../../components/Spinner";
import UserContentEdit from "../../../components/UserContentEdit";
import { useGetUserByHandle } from "../../../hooks/useGetUserByHandle";
import { useGetUserById } from "../../../hooks/useGetUserById";


export default function UserPage() {
    const session = useSession();

    const { user } = useRouter().query as { user: string };

    const { data: pageUserData, isLoading: IsPageDataLoading } = useGetUserByHandle(user);
    const { data: sessionUserData, isLoading: IsSessionLoading } = useGetUserById(session?.data?.user?.id || "");


    if (!pageUserData) {
        return null;
    }

    let isMyPage = sessionUserData?.id === pageUserData?.id;

    return (
        <>
            <Head>
                <title>{pageUserData?.name} - @{pageUserData.handle}</title>
                <link rel="shortcut icon" href='/favicon.ico?' type="image/x-icon" />
                <meta name="description" content="Gugu microblogging platform" />
            </Head>
            <div className='flex flex-col min-h-screen'>

                <div className='flex flex-grow'>
                    {IsPageDataLoading || IsSessionLoading  && <Spinner />}
                    {sessionUserData && <Sidebar handle={sessionUserData.handle} />}
                    {pageUserData && sessionUserData && !isMyPage && (

                    <UserContent user={pageUserData} />
                    )}
                    {pageUserData && isMyPage && <UserContentEdit user={pageUserData} />}
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

    
    if (!user_data) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            session,
            trpcState: ssg.dehydrate(),
        }
    }
}