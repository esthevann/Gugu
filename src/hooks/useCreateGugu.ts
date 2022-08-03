import { trpc } from "../utils/trpc";

export function useCreateGugu() {
    const client = trpc.useContext();
    return trpc.useMutation(["gugu.createGugu"], {
        onSuccess: (gugu) => {
            client.invalidateQueries("gugu.listAllGugus");
        }
    });
}