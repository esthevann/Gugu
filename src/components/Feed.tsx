import { Gugu } from "./Gugu";
import { PostForm } from "./PostForm";

export default function Feed() {
    return (
        <div className="flex flex-col flex-1 pl-12">
            <div className="flex flex-col items-center pl-12">
                <div className="pb-6"></div>
                <PostForm />
                <div className="pb-6"></div>
            </div>
            <h2 className="text-xl font-bold">Gugus mais recentes</h2>
            <div className="pb-6"></div>
            <div className="flex flex-col items-center gap-1">
                <Gugu/>
                <Gugu/>
                <Gugu/>
            </div>
           
        </div>

    )
}