# Delizioso – React + Tailwind CSS

```bash
npm install
npm run dev
```

## Routes
| Path | Screen |
|---|---|
| `/` | Home (responsive, mobile layout included) |
| `/menu` | Menu with category tabs + pagination |
| `/reservation` | Book a table |
| `/reservation/confirm` | Confirm reservation (5:00 hold timer, validation) |
| `/reservation/confirmed` | Reservation confirmed (Modify / Cancel) |
| `/reservation/cancel` | Cancel reservation |
| `/order` | Order online – menu sections + sticky Order list (bottom sheet on mobile) |
| `/checkout` | Checkout (address summary on desktop, inline map picker on mobile) |
| `/checkout/address` | Shipping address modal with map |
| `/login`, `/signup` | Auth screens |

Dummy images live in `src/data/images.js` (picsum.photos) – replace the URLs with real assets.
Brand colors/fonts are in `tailwind.config.js`.
