import type { NextRouter } from "next/router";
import { trpc } from "../utils/trpc";

export function useAddHandle(router: NextRouter) {
    const refreshData = (router: NextRouter) => {
        router.replace(router.asPath);
    }

    return trpc.useMutation(["user.addHandle"], {
        onSuccess: () => {
            refreshData(router);
        }
    });
}