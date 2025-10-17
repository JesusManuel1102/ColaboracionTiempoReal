import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { QueryClientConfig } from "./config/tanstackQuery/queryClientConfig";
import { ApplicationRouter } from "./router/router";

function App() {
  return (
    // <GoogleProviderConfig>
      <Suspense
        fallback={
          <>
            Loading content... <br /> Please wait!
          </>
        }>
        <QueryClientProvider client={QueryClientConfig}>
          <ApplicationRouter />
        </QueryClientProvider>
      </Suspense>
    // </GoogleProviderConfig>
  );
}

export default App;
