import { RouterProvider } from "react-router-dom"
import { router } from "./routes/router"  
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";


const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
<Toaster position="bottom-right" visibleToasts={1} />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  )
}

export default App
