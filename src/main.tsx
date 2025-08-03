import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import WhatsappButton from "./components/WhatsappButton.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <>
          <App />
          <WhatsappButton />
        </>  
      </BrowserRouter>
    </Provider>
  </StrictMode>
);