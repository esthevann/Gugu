import Link from "next/link";
import { User, House, SignOut } from 'phosphor-react';
import { signOut } from "next-auth/react";

interface SidebarProps {
    handle: string | null | undefined;
}

export function Sidebar(props: SidebarProps) {
    const profilePath = props.handle ? `/profile/${props.handle}` : "#";
    return (
        <div className="flex flex-col border-r-2 border-gray-800">
            <aside className="flex-1 pt-12 pl-32 pr-6 ">
                <h2 className="text-2xl font-bold">Gugu</h2>
                <div className="pb-1"></div>
                <ul className="flex flex-col gap-2">
                    <li className="flex px-2 py-1 rounded-full hover:bg-gray-500">
                        <Link href={"/"}>
                            <a className="flex items-center gap-2 text-xl" >
                                <House size={24} />
                                Página Inicial
                            </a>
                        </Link>
                    </li>
                    <li className="flex px-2 py-1 rounded-full hover:bg-gray-500 ">
                        <Link href={profilePath} >
                            <a className="flex items-center gap-2 text-xl" >
                                <User size={24} />
                                Perfil
                            </a>
                        </Link>
                    </li>
                    <li className="flex">
                        <button onClick={() => signOut()} className='flex items-center gap-2 px-2 py-1 text-xl rounded-full hover:bg-gray-500'> <SignOut size={24}/> Sign out</button>
                    </li>

                </ul>
            </aside>                    
        </div>

    )
}