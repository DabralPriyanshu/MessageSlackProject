import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { AppContextProvider } from "./context/AppContextProvider";
import AppRoutes from "./Routes";
const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <AppRoutes />
      </AppContextProvider>
      <Toaster />
    </QueryClientProvider>
  );
};

export default App;
