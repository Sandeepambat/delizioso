import { img } from "./images.js";

const blurb = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas consequat";
const slug = (n) => n.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const make = (names, group) =>
  names.map((name) => ({ id: slug(name), name, price: 12.05, rating: 4, blurb, image: img(`${group}-${slug(name)}`, 300, 300) }));

export const orderSections = [
  {
    title: "Pasta",
    categories: ["Dinner", "Lunch"],
    items: make(["Spaghetti", "Linguine", "Capellini", "Fettuccine", "Bucatini", "Tortellini", "Fusilli", "Farfalle", "Penne Alla Vodka"], "pasta"),
  },
  {
    title: "Pizza",
    categories: ["Dinner"],
    items: make(["Splitza Signature", "Super Supreme", "Veggie Garden", "Double Beef Burger", "Meat Lovers", "Extravaganzza", "Meat & Meat", "Meatzza", "Tuna Delight"], "pizza"),
  },
];
