import { NextPage } from "next";
import Link from "next/link";
import { User, House } from 'phosphor-react';

export function Sidebar() {
    return (
        <div className="flex flex-col border-r-2 border-gray-800">
            <aside className="flex-1 pt-12 pl-32 pr-6 ">
                <h2 className="text-2xl font-bold">Gugu</h2>
                <div className="pb-1"></div>
                <ul className="flex flex-col gap-2">
                    <li className="flex ">
                        <Link href={"#"}>
                            <a className="flex items-center gap-2 text-xl" >
                                <House size={24} />
                                Página Inicial
                            </a>
                        </Link>
                    </li>
                    <li className="flex ">
                        <Link href={"#"} >
                            <a className="flex items-center gap-2 text-xl" >
                                <User size={24} />
                                Perfil
                            </a>
                        </Link>
                    </li>

                </ul>
            </aside>                    
            <div className="flex items-center gap-2 pb-5 pl-32">
            </div>
        </div>

    )
}