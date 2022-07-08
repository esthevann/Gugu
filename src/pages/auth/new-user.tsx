import Head from "next/head";

export default function NewUser() {
    return (
        <div className="flex flex-col min-h-screen">
            <Head>
                <title>Complete seu perfil - Gugu</title>
            </Head>
            <form action="">
                <div className="flex flex-col items-center">
                    <div className="pb-6"></div>
                    <h1 className="text-3xl font-bold">Complete o seu perfil</h1>
                </div>
            </form>
        </div>
    );
}