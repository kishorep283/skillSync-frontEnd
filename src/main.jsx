import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./WEBRTC/repostWeb.js";
import { SocketProvider } from "./WEBRTC/ScoketProvider/socketProvider.jsx";
// import { AuthContext } from "./PAGES/DashBoard_page/Components/AuthContext.jsx";
// import './index.css'
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SocketProvider>
        <App />
      </SocketProvider>
    </BrowserRouter>
  </StrictMode>
);
reportWebVitals();