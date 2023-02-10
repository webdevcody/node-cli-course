import { type AppType } from "next/app";

import { api } from "../utils/api";

import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/globals.css";
import { NavBar } from "../components/NavBar";

const queryClient = new QueryClient();
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />
      <Component {...pageProps} />{" "}
    </QueryClientProvider>
  );
};

export default api.withTRPC(MyApp);
