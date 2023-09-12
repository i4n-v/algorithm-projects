import { format, getDay, getMonth, getYear, parseISO } from "date-fns";
import { v4 } from "uuid";

export default class Product {
  constructor(name, category, price, date) {
    this.id = v4();
    this.name = name;
    this.category = category;
    this.price = price;
    this.date = date;
    this.day = getDay(parseISO(date)) + 1;
    this.month = getMonth(parseISO(date)) + 1;
    this.year = getYear(parseISO(date));
  }

  getDate() {
    return format(parseISO(this.date), "dd/MM/yyyy");
  }
}
