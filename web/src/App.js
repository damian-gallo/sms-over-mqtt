import { Dashboard } from "./components/Dashboard";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrokerProvider } from "./providers/BrokerProvider";
import dark from "./themes/dark";

function App() {
  return (
    <BrokerProvider>
      <ThemeProvider theme={dark}>
        <CssBaseline />
        <Dashboard />
      </ThemeProvider>
    </BrokerProvider>
  );
}

export default App;
