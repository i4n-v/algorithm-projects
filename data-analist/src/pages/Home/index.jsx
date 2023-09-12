import { useContext, useState } from "react";
import { Box, Modal } from "../../components";
import { FilterButton, SubmitButton } from "../../components/Buttons/index";
import { GlobalContext } from "../../contexts/GlobalContext";
import SimpleTooltip from "../../components/Tooltips/SimpleTooltip";
import { BarChart, LineChart, AreaChart } from "../../components/Charts";
import useUtils from "../../hooks/useUtils";
import CustomArray from "../../entities/CustomArray";
import SalesList from "./Sales/SalesList";
import SalesForm from "./Sales/SalesForm";
import Settings from "./Settings";
import useLocalStorage from "../../hooks/useLocalStorage";
import { format, isWithinInterval, parseISO, subMonths } from "date-fns";

export default function Home() {
  const { sales } = useContext(GlobalContext);
  const [filters, setFilters] = useLocalStorage("filters", {
    initial_date: format(subMonths(new Date(), 1), "yyyy-MM-dd"),
    final_date: format(new Date(), "yyyy-MM-dd"),
    category: "-",
    dimensions: ["Ano", "Mês", "Categoria"],
  });
  const [showSettings, setShowSettings] = useState(false);
  const [showSales, setShowSales] = useState(false);
  const { numberToRem, toBRL } = useUtils();

  function flatData(data) {
    return data.reduce((previous, year) => {
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
  }
  const [formSales, setFormSales] = useState(false);

  function filterData(data) {
    const { initial_date, final_date, category } = filters;

    const filteredData = data.filter((product) => {
      const isBetween = isWithinInterval(parseISO(product.date), {
        start: parseISO(initial_date),
        end: parseISO(final_date),
      });

      const matchCategory = product.category === category || category === "-";

      return isBetween && matchCategory;
    });

    return filteredData;
  }

  function groupByDimensions(data) {
    const { dimensions } = filters;

    const year = new CustomArray();
    const month = new CustomArray();
    const category = new CustomArray();

    data.forEach((product) => {
      if (dimensions.includes("Ano")) {
        const yearIndex = year.findIndex((item) => item.year === product.year);

        if (yearIndex !== -1) {
          const value = year.getValue(yearIndex);
          value.price += product.price;
          year.setValue(yearIndex, value);
        } else {
          year.push(product);
        }
      }

      if (dimensions.includes("Mês")) {
        const monthIndex = month.findIndex(
          (item) => item.month === product.month
        );

        if (monthIndex !== -1) {
          const value = month.getValue(monthIndex);
          value.price += product.price;
          month.setValue(monthIndex, value);
        } else {
          month.push(product);
        }
      }

      if (dimensions.includes("Categoria")) {
        const categoryIndex = category.findIndex(
          (item) => item.category === product.category
        );

        if (categoryIndex !== -1) {
          const value = category.getValue(categoryIndex);
          value.price += product.price;
          category.setValue(categoryIndex, value);
        } else {
          category.push(product);
        }
      }
    });

    return { year, month, category };
  }

  const { year, month, category } = groupByDimensions(
    filterData(flatData(sales))
  );

  function togleFilters() {
    setShowSettings((showSettings) => !showSettings);
  }

  function togleSalesList() {
    setShowSales((showSales) => !showSales);
  }

  function togleSalesForm() {
    setFormSales((showSales) => !showSales);
  }

  const bars = new CustomArray({ key: "price", gradient: "gdr-1" });
  const lines = new CustomArray({ key: "price", gradient: "gdr-2" });
  const areas = new CustomArray({ key: "price", gradient: "gdr-3" });

  return (
    <section className="bg-neutral-900 min-h-screen px-2 py-8 flex flex-col gap-32">
      <Box className="flex justify-between gap-2 bg-transparent/0">
        <FilterButton onClick={togleFilters}>Configurações</FilterButton>
        <Box className="flex gap-8">
          <SubmitButton onClick={togleSalesForm}>Cadastrar vendas</SubmitButton>
          <SubmitButton onClick={togleSalesList}>
            Visualizar vendas
          </SubmitButton>
        </Box>
      </Box>
      <Modal
        title="Configurações"
        display={showSettings}
        onClose={togleFilters}
      >
        <Settings filters={filters} setFilters={setFilters} />
      </Modal>
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
      >
        <SalesForm />
      </Modal>
      {!!year.getStructure().length && (
        <Box className="bg-transparent/0">
          <p className="text-neutral-50 text-2xl font-title mb-10">
            Valores por ano:
          </p>
          <BarChart
            data={year}
            bars={bars}
            gradients={
              new CustomArray({
                id: "gdr-1",
                from: "#c4b5fd",
                to: "#4c1d95",
              })
            }
            tooltip={{
              content: (
                <SimpleTooltip
                  nameFormatter={() => "Valor total: "}
                  valueFormatter={(value) => toBRL(value)}
                />
              ),
            }}
            label={{
              fill: "#d4d4d4",
              formatter: (value) => toBRL(value),
            }}
            x={{
              dataKey: "year",
              interval: 0,
              axisLine: false,
              tickLine: false,
            }}
            y={{
              axisLine: false,
              tickLine: false,
              tickFormatter: (value) => toBRL(value),
            }}
            margin={{
              right: numberToRem(5),
              left: numberToRem(6),
            }}
            cartesiangrid={{
              horizontal: true,
              vertical: false,
              strokeDasharray: "3 3",
            }}
            className="w-full h-[30rem]"
          />
        </Box>
      )}
      {!!month.getStructure().length && (
        <Box className="bg-transparent/0">
          <p className="text-neutral-50 text-2xl font-title mb-10">
            Valores por mês:
          </p>
          <LineChart
            data={month}
            lines={lines}
            gradients={
              new CustomArray({
                id: "gdr-2",
                from: "#86efac",
                to: "#14532d",
              })
            }
            tooltip={{
              content: (
                <SimpleTooltip
                  nameFormatter={() => "Valor total: "}
                  valueFormatter={(value) => toBRL(value)}
                />
              ),
            }}
            label={{
              fill: "#d4d4d4",
              formatter: (value) => toBRL(value),
            }}
            x={{
              dataKey: "month",
              interval: 0,
              axisLine: false,
              tickLine: false,
            }}
            y={{
              axisLine: false,
              tickLine: false,
              tickFormatter: (value) => toBRL(value),
            }}
            margin={{
              top: numberToRem(0.5),
              right: numberToRem(5),
              left: numberToRem(6),
            }}
            cartesiangrid={{
              horizontal: true,
              vertical: false,
              strokeDasharray: "3 3",
            }}
            className="w-full h-[30rem]"
          />
        </Box>
      )}
      {!!category.getStructure().length && (
        <Box className="bg-transparent/0">
          <p className="text-neutral-50 text-2xl font-title mb-10">
            Valores por categoria:
          </p>
          <AreaChart
            data={category}
            areas={areas}
            gradients={
              new CustomArray({
                id: "gdr-3",
                from: "#93c5fd",
                to: "#1e3a8a",
              })
            }
            tooltip={{
              content: (
                <SimpleTooltip
                  nameFormatter={() => "Valor total: "}
                  valueFormatter={(value) => toBRL(value)}
                />
              ),
            }}
            label={{
              fill: "#d4d4d4",
              formatter: (value) => toBRL(value),
            }}
            x={{
              dataKey: "category",
              interval: 0,
              axisLine: false,
              tickLine: false,
            }}
            y={{
              axisLine: false,
              tickLine: false,
              tickFormatter: (value) => toBRL(value),
            }}
            margin={{
              right: numberToRem(5),
              left: numberToRem(6),
            }}
            cartesiangrid={{
              horizontal: true,
              vertical: false,
              strokeDasharray: "3 3",
            }}
            className="w-full h-[30rem]"
          />
        </Box>
      )}
    </section>
  );
}
