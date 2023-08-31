import { useContext, useState } from "react";
import { Box, Modal } from "../../components";
import { FilterButton, SubmitButton } from "../../components/Buttons/index";
import { GlobalContext } from "../../contexts/GlobalContext";

export default function Home() {
  const { sales } = useContext(GlobalContext);
  const [showSettings, setShowSettings] = useState(false);
  const [showSales, setShowSales] = useState(false);

  console.log(sales);

  function togleFilters() {
    setShowSettings((showSettings) => !showSettings);
  }

  function togleSales() {
    setShowSales((showSales) => !showSales);
  }

  return (
    <section className="bg-neutral-900 min-h-screen px-2 py-8">
      <Box className="flex justify-between gap-2 bg-transparent/0">
        <FilterButton onClick={togleFilters}>Configurações</FilterButton>
        <SubmitButton onClick={togleSales}>Visualizar vendas</SubmitButton>
      </Box>
      <Modal
        title="Configurações"
        display={showSettings}
        onClose={togleFilters}
      ></Modal>
      <Modal
        title="Listagem de vendas"
        display={showSales}
        onClose={togleSales}
        fullWidth
      ></Modal>
    </section>
  );
}
