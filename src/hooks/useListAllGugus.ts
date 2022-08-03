import { trpc } from "../utils/trpc";

export function useListAllGugus(){
    return trpc.useQuery(["gugu.listAllGugus"]);
}