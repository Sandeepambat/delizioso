import pasta from "../Assets/pasta.png";
import salad from "../Assets/salad.png";
import pancakes from "../Assets/pancake.png";
import pizza from "../Assets/pizza.png";
import risotto from "../Assets/risotto.png";
import lasagna from "../Assets/lasagna.png";
import tiramisu from "../Assets/tiramisu.png";
import gelato from "../Assets/gelato.png";
import table from "../Assets/table.jpg";
import Head from "../Assets/head.png";
import chef1 from "../Assets/chef1.png";
import chef2 from "../Assets/chef2.png";
import chef3 from "../Assets/chef3.png";
import res from "../Assets/res.png";
// import fallback from "../Assets/fallback.png";

export const images = {
  // fallback,
  fallback: pasta, 
  dishes: { pasta, salad, pancakes, pizza, risotto, lasagna, tiramisu, gelato },

  // Home page placeholders (replace with real assets later)
  hero: pasta,
  welcome: salad,
  groupDining: table,
  openBg: risotto,
  avatars: [pasta, salad, pizza, gelato, tiramisu], // needs 5 (one per testimonial)
  chefs: [Head, chef1, chef2, chef3],          // needs 4 (one per chef)
  Reservation: [res],          // needs 4 (one per chef)
};

const byGroup = {
  pasta: [pasta, risotto, lasagna],
  pizza: [pizza],
};

/** Deterministic local placeholder by group (e.g. "pasta-spaghetti"). */
export const img = (key) => {
  const group = key.split("-")[0];
  const pool = byGroup[group] ?? Object.values(images.dishes);
  let hash = 0;
  for (const ch of key) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return pool[hash % pool.length];
};