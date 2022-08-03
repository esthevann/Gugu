import { trpc } from "../utils/trpc";

export function useGetUserById(id: string) {
    return trpc.useQuery(["user.getUserById", id]);
}