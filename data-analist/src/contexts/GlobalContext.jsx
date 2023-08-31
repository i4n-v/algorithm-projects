import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import data from "../mocks/sales";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [sales, setSales] = useLocalStorage("sales", data);

  return (
    <GlobalContext.Provider value={{ sales, setSales }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
