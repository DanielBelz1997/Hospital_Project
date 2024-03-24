import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootPage } from "./routes/RootPage";
import { ErrorPage } from "./routes/ErrorPage";
import { DashboardPage } from "./routes/DashboardPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Dashboard",
    element: <DashboardPage />,
    errorElement: <ErrorPage />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <MantineProvider>
        <RouterProvider router={router} />
      </MantineProvider>
    </React.StrictMode>
  </QueryClientProvider>
);
