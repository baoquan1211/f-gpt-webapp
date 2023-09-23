import React, { Suspense } from "react";
const ChatRoom = React.lazy(() => import("./pages/ChatRoom"));
const Login = React.lazy(() => import("./pages/Login"));
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@/components/theme-provider";
import Policy from "./pages/Policies";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: Infinity,
          },
          mutations: {
            cacheTime: Infinity,
          },
        },
      })
  );

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
              <BrowserRouter>
                <Suspense fallback={<div>Loading...</div>}>
                  <ToastContainer />
                  <Routes>
                    <Route path="/" element={<ChatRoom />} />
                    <Route path="/c/:id" element={<ChatRoom />} />
                    <Route path="/c/:id" element={<ChatRoom />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/policies" element={<Policy />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
              <ReactQueryDevtools initialIsOpen={false} />
            </ThemeProvider>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
