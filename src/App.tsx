import { Global } from "@emotion/react";
import AppRoutes from "./routes";
import { GlobalStyles } from "./styles/global";

const App = () => {
  return (
    <>
      <Global styles={GlobalStyles} /> <AppRoutes />
    </>
  );
};

export default App;
