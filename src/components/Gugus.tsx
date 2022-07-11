import { Gugu } from "./Gugu";
import { FeedProps } from "./Feed";


export function Gugus(props: FeedProps) {
    return <div className="flex flex-col items-center gap-1">
        {props.gugus && props.gugus.map(gugu => <Gugu
            key={gugu.id}
            content={gugu.content} createdAt={gugu.createdAt}
            handle={gugu.user.handle!} img={gugu.user.image!}
            name={gugu.user.name!} />)}
    </div>;
}
