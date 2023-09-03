import { useContext, useState } from "react";
import { Box, Modal } from "../../components";
import { FilterButton, SubmitButton } from "../../components/Buttons/index";
import { GlobalContext } from "../../contexts/GlobalContext";
import SimpleTooltip from "../../components/Tooltips/SimpleTooltip";
import { ComposedChart } from "../../components/Charts";
import useUtils from "../../hooks/useUtils";
import CustomArray from "../../entities/CustomArray";
import SalesList from "./Sales/SalesList";
import SalesForm from "./Sales/SalesForm";

export default function Home() {
  const { sales } = useContext(GlobalContext);
  const [showSettings, setShowSettings] = useState(false);
  const [showSales, setShowSales] = useState(false);
  const { numberToRem, toBRL } = useUtils();

  const data = sales.reduce((previous, year) => {
    const newArray = new CustomArray(...previous.getStructure());

    year.forEach((month) => {
      month.forEach((category) => {
        category.forEach((product) => {
          newArray.push(product);
        });
      });
    });

    return newArray;
  }, new CustomArray());
  const [formSales, setFormSales] = useState(false);

  function togleFilters() {
    setShowSettings((showSettings) => !showSettings);
  }

  function togleSalesList() {
    setShowSales((showSales) => !showSales);
  }

  function togleSalesForm() {
    setFormSales((showSales) => !showSales);
  }

  return (
    <section className="bg-neutral-900 min-h-screen px-2 py-8 flex flex-col gap-32">
      <Box className="flex justify-between gap-2 bg-transparent/0">
        <FilterButton onClick={togleFilters}>Configurações</FilterButton>
        <SubmitButton onClick={togleSalesForm}>Cadastrar vendas</SubmitButton>
        <SubmitButton onClick={togleSalesList}>Visualizar vendas</SubmitButton>
      </Box>
      <Modal
        title="Configurações"
        display={showSettings}
        onClose={togleFilters}
      ></Modal>
      <Modal
        title="Listagem de vendas"
        display={showSales}
        onClose={togleSalesList}
        fullWidth
        >
        <SalesList />
      </Modal>
      <Modal
        title="Cadastro de vendas"
        display={formSales}
        onClose={togleSalesForm}
        fullWidth
      >
        <SalesForm />
      </Modal>

      <ComposedChart
        data={data}
        bars={[{ key: "price", gradient: "gdr-1" }]}
        gradients={[
          {
            id: "gdr-1",
            from: "#c4b5fd",
            to: "#4c1d95",
          },
        ]}
        tooltip={{
          content: (
            <SimpleTooltip
              labelFormatter={(label) => `Preço: ${toBRL(label)}`}
              nameFormatter={() => "Solicitações"}
            />
          ),
        }}
        label={{
          fill: "#d4d4d4",
        }}
        x={{
          dataKey: "year",
          interval: 0,
          axisLine: false,
          tickLine: false,
        }}
        y={{ axisLine: false, tickLine: false }}
        margin={{
          right: numberToRem(2),
        }}
        cartesiangrid={{
          horizontal: true,
          vertical: false,
          strokeDasharray: "3 3",
        }}
        className="flex-1"
      />
    </section>
  );
}
