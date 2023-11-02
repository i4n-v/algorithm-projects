import { QueryClient } from "react-query";

const queryClientConfig = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
            refetchOnWindowFocus: false,
        },
    },
});

export default queryClientConfig;