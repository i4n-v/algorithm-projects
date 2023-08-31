import { Home } from "./pages";
import { GlobalProvider } from "./contexts/GlobalContext";
import { NotifierProvider } from "./contexts/NotifierContext";
import GlobalNotifier from "./helpers/GlobalNotifier";

function App() {
  return (
    <GlobalProvider>
      <NotifierProvider>
        <Home />
        <GlobalNotifier />
      </NotifierProvider>
    </GlobalProvider>
  );
}

export default App;
