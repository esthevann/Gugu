import { useSession } from "next-auth/react";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions as nextAuthOptions } from "../../api/auth/[...nextauth]";
import { GetServerSideProps } from "next";
import { ssg_helper } from '../../../utils/ssg-helper';
import Spinner from "../../../components/Spinner";
import Head from "next/head";
import { Sidebar } from "../../../components/Sidebar";
import EditForm from "../../../components/EditForm";
import { useGetUserByHandle } from "../../../hooks/useGetUserByHandle";

interface EditProps {
    user: string;
}

export default function EditUserPage(props: EditProps) {
    let userHandle = props.user;
    let { data: pageUserData, isLoading: IsPageDataLoading } = useGetUserByHandle(userHandle);
    let { data: loggedUserData, status } = useSession({ required: true });

    return (
        <>
            <Head>
                <title>{loggedUserData?.user?.name} - @{userHandle}</title>
                <link rel="shortcut icon" href='/favicon.ico?' type="image/x-icon" />
                <meta name="description" content="Gugu microblogging platform" />
            </Head>
            <div className='flex flex-col min-h-screen'>
                <div className="flex flex-grow">
                    <Sidebar handle={userHandle} />
                    {status == "loading" || IsPageDataLoading && <Spinner />}
                    {status !== "loading" && pageUserData && <EditForm handle={userHandle} user={pageUserData}  />}         
                </div>
            </div>

        </>

    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    let { user } = ctx.query as { user: string };
    let session = await getServerSession(ctx.req, ctx.res, nextAuthOptions);

    if (!user) {
        return {
            notFound: true
        }
    }

    if (!session || !session.user?.id) {
        return {
            redirect: {
                destination: '/api/auth/signin',
                permanent: false,
            }
        }
    }

    const ssg = await ssg_helper(session);

    const userOfThePage = await ssg.fetchQuery('user.getUserByHandle', user);

    if (!userOfThePage || userOfThePage.handle !== user) {
        return {
            redirect: {
                destination: `/profile/${user}`,
                permanent: false,
            }
        }
    }

    return {
        props: {
            trpcState: ssg.dehydrate(),
            user
        }
    }
}