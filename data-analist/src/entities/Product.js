import { format, parseISO } from "date-fns";

export default class Product {
  constructor(name, category, price, date) {
    this.name = name;
    this.category = category;
    this.price = price;
    this.date = date;
  }

  getDate() {
    return format(parseISO(this.date), "dd/MM/yyyy");
  }
}
