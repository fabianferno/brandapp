import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { MoralisProvider } from "react-moralis";

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider
      serverUrl="https://ph4c4v5zug6d.usemoralis.com:2053/server"
      appId="ZXNjOEjsPVu6xtjlDehMwJ6ZP0TqfaLSoUub7e3l"
    >
      <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
