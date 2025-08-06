import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthProvider } from "@/providers/AuthProvider";

import "@/styles/globals.css";

export const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: any) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </QueryClientProvider>
  );
}
