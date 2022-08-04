import { Gugu } from "./Gugu";
import { FeedProps } from "./Feed";


export function Gugus(props: FeedProps) {

    return <div className="flex flex-col items-center gap-1">
        {props.gugus && props.gugus.map(function (gugu){
            let user = props.likedList.find((a) => { console.log(a.id, gugu.id); return a.id === gugu.id; });
            let isLiked = user ? true : false;
            return <Gugu
                id={gugu.id}
                key={gugu.id}
                likes={gugu.likes}
                content={gugu.content} createdAt={gugu.createdAt}
                handle={gugu.user.handle!} img={gugu.user.image!}
                name={gugu.user.name!}
                isLiked={isLiked} />
        } 
    )}
    </div>;
}
