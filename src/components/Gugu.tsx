import Image from "next/future/image";

export function Gugu() {
    return (
        <div className="px-6 py-3 border border-gray-500 rounded-md max-w-fit">
            <div className="flex gap-2">
                <Image src="/gugu.png" alt="Gugu" className="w-12 h-12 rounded-full " />
                <div>
                    <div className="flex gap-2">
                        <h2 className="font-bold"> Gugu  </h2>
                        <div className="flex gap-1 text-gray-600">
                            <p>@GuguOficial</p>
                            ·
                            <p>11/06/2020</p>
                        </div>

                    </div>

                    <p className="flex-wrap">Gugu</p>
                </div>

            </div>
        </div>
    )
}