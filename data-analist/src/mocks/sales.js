import CustomArray from "../entities/CustomArray";
import Product from "../entities/Product";
import faker from "../config/faker";
import categories from "./categories";
import randomNumber from "../utils/randomNumber";
import { format, getMonth, getYear, parseISO } from "date-fns";

const products = new CustomArray();
const sales = new CustomArray();

for (let index = 1; index <= 1000; index++) {
  const number = randomNumber(0, categories.getStructure().length - 1);
  let date;
  const category = categories.getValue(number);

  if (index <= 25) {
    date = faker.date.between({ from: "2020-01-01", to: "2020-12-30" });
  } else if (index <= 50) {
    date = faker.date.between({ from: "2021-01-01", to: "2022-12-30" });
  } else if (index <= 75) {
    date = faker.date.between({ from: "2022-01-01", to: "2022-12-30" });
  } else {
    date = faker.date.between({ from: "2023-01-01", to: "2023-12-30" });
  }

  const product = new Product(
    faker.commerce.productName(),
    category,
    Number.parseFloat(faker.number.float({ min: 0, max: 100 }).toFixed(2)),
    format(date, "yyyy-MM-dd")
  );

  const yearIndex = sales.findIndex((year) => {
    const value = year.getValue(0).getValue(0).getValue(0);
    return getYear(parseISO(value.date)) === getYear(date);
  });

  if (yearIndex === -1) {
    sales.push(new CustomArray());
    const currentIndex = sales.getStructure().length ? sales.getStructure().length - 1 : 0;
    const year = sales.getValue(currentIndex);
    year.push(new CustomArray());
    const month = year.getValue(0);
    month.push(new CustomArray());
    month.getValue(0).push(product);
  } else {
    const year = sales.getValue(yearIndex);
    const monthIndex = year.findIndex((month) => {
      const value = month.getValue(0).getValue(0);
      return getMonth(parseISO(value.date)) === getMonth(date);
    });

    if (monthIndex === -1) {
      year.push(new CustomArray());
      const currentIndex = year.getStructure().length ? year.getStructure().length - 1 : 0;
      const month = year.getValue(currentIndex);
      month.push(new CustomArray());
      month.getValue(0).push(product);
    } else {
      const month = year.getValue(monthIndex);
      const categoryIndex = month.findIndex((option) => {
        const value = option.getValue(0);
        return value.category === category;
      });

      if (categoryIndex === -1) {
        month.push(new CustomArray());
        const currentIndex = month.getStructure().length ? month.getStructure().length - 1 : 0;
        month.getValue(currentIndex).push(product);
      } else {
        month.getValue(categoryIndex).push(product);
      }
    }
  }

  products.push(product);
}

export default sales;
