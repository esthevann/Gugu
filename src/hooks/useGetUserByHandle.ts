import { trpc } from "../utils/trpc";

export function useGetUserByHandle(handle: string) {
    return trpc.useQuery(["user.getUserByHandle", handle]);
}