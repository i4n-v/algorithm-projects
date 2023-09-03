import { useContext, useEffect } from "react";
import { Box, Table } from "../../../../components";
import CustomArray from "../../../../entities/CustomArray";
import { GlobalContext } from "../../../../contexts/GlobalContext";

export default function SalesList() {

  const columns = new CustomArray("Nome", "Categoria", "Preço", "Data", "Dia", "Mês", "Ano")
  const { sales } = useContext(GlobalContext)
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
  useEffect(() => {
    console.log(data)
  }, [])
  return (
    <Box className="max-h-96 overflow-auto" >
      <Table columns={columns} rows={data} />
    </Box>
  )
}