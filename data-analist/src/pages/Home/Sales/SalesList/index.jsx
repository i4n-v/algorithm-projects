import { useContext } from "react";
import { Box, Table } from "../../../../components";
import CustomArray from "../../../../entities/CustomArray";
import { GlobalContext } from "../../../../contexts/GlobalContext";
import useUtils from "../../../../hooks/useUtils";

export default function SalesList() {
  const columns = new CustomArray(
    "Nome",
    "Categoria",
    "Preço",
    "Dia",
    "Mês",
    "Ano"
  );
  const disabledIdentifier = new CustomArray("id", "date");
  const { sales, setSales } = useContext(GlobalContext);
  const { toBRL } = useUtils();

  const data = sales?.reduce((previous, year) => {
    const newArray = new CustomArray(...previous.getStructure());

    year.forEach((month) => {
      month.forEach((category) => {
        category.forEach((product) => {
          const newProduct = {
            ...product,
            price: toBRL(product.price),
          };
          newArray.push(newProduct);
        });
      });
    });

    return newArray;
  }, new CustomArray());

  function handleDelete(id) {
    const data = sales?.reduce((previous, year) => {
      const newArray = new CustomArray();

      sales.forEach((year, yearIndex) => {
        newArray.push(new CustomArray());
        year.forEach((month, monthIndex) => {
          newArray.getValue(yearIndex).push(new CustomArray());

          month.forEach((category) => {
            const newCategories = category.filter(
              (product) => !(product.id === id)
            );
            newArray
              .getValue(yearIndex)
              .getValue(monthIndex)
              .push(newCategories);
          });
        });
      });

      return newArray;
    }, new CustomArray());
    data.filter((curr) => {
      console.log(curr.getValue(0).getValue(0).getValue(0));
      return true;
    });
    setSales(data);
  }
  return (
    <Box className="max-h-[50rem] overflow-auto">
      <Table
        columns={columns}
        rows={data}
        disabledIdentifier={disabledIdentifier}
        handleDelete={handleDelete}
      />
    </Box>
  );
}
