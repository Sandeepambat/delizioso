import { images } from "./images";

export const categories = ["All", "Pasta", "Pizza", "Salad", "Dessert"];

export const menuItems = [
  { id: 1, name: "Spaghetti Carbonara", category: "Pasta", rating: 5, price: 12.5, blurb: "Creamy egg sauce with crispy pancetta and pecorino.", image: images.dishes.pasta },
  { id: 2, name: "Garden Salad", category: "Salad", rating: 4, price: 8.0, blurb: "Fresh greens, cherry tomatoes and a light vinaigrette.", image: images.dishes.salad },
  { id: 3, name: "Fluffy Pancakes", category: "Dessert", rating: 5, price: 9.0, blurb: "Stacked pancakes with maple syrup and berries.", image: images.dishes.pancakes },
  { id: 4, name: "Margherita Pizza", category: "Pizza", rating: 5, price: 11.0, blurb: "Tomato, mozzarella and fresh basil on a thin crust.", image: images.dishes.pizza },
  { id: 5, name: "Mushroom Risotto", category: "Pasta", rating: 4, price: 13.0, blurb: "Slow-cooked arborio rice with wild mushrooms.", image: images.dishes.risotto },
  { id: 6, name: "Beef Lasagna", category: "Pasta", rating: 5, price: 14.0, blurb: "Layered pasta, rich ragù and béchamel, baked golden.", image: images.dishes.lasagna },
  { id: 7, name: "Tiramisu", category: "Dessert", rating: 5, price: 7.5, blurb: "Espresso-soaked ladyfingers with mascarpone cream.", image: images.dishes.tiramisu },
  { id: 8, name: "Pistachio Gelato", category: "Dessert", rating: 4, price: 6.0, blurb: "Silky Italian gelato made with roasted pistachios.", image: images.dishes.gelato },
];