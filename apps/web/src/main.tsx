import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const RoutesWrapper = () => (
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastContainer />
          <Outlet />
        </PersistGate>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RoutesWrapper />}>
      <Route path="/*" element={<App />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
