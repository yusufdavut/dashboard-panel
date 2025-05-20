import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { store } from "./app/store";
import AppRouter from "./app/router";
import "./index.css";
import { ConfigProvider } from "antd";
import { theme } from "./app/theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <AppRouter />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
