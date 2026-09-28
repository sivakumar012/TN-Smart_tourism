# tourist-discovery — Requirements

## Feature summary

Tourist discovery enables visitors to explore the Chennai–Mahabalipuram pilot corridor, search and filter attractions, and navigate to pass selection.

---

## Acceptance criteria

### Home screen

**SHALL** display the brand name "TN smart tourism" and tagline "Explore smarter. Experience more."

**SHALL** display hero text "Discover Tamil Nadu your way."

**SHALL** display a destination selector defaulting to "Chennai → Mahabalipuram."

**SHALL** display a primary CTA "Explore passes" that navigates to the Explore screen.

**SHALL** display a secondary CTA "Plan my visit" (may link to Explore in MVP).

**SHALL NOT** display any pricing, ratings, or reviews that claim to be official.

---

### Explore screen

**SHALL** display a search input that filters attractions by name in real time.

**SHALL** display category filter buttons: Heritage, Culture, Experience, Coastal.

**SHALL** display a destination filter for the pilot corridor.

**WHEN** a category filter is selected, **SHALL** show only attractions matching that category.

**WHEN** a search term is entered, **SHALL** filter attractions matching name or location.

**WHEN** no filter is active, **SHALL** display all active attractions.

**IF** an attraction has `deleted_at IS NOT NULL`, **SHALL NOT** display it.

**SHALL** display each attraction as a card containing: image, name, location, category, short description, demo price (where applicable).

**SHALL NOT** claim real partnerships, ticket inventory, official prices, ratings, or reviews.

---

### Attraction details screen

**SHALL** display the attraction's full name, image, location, category, and description.

**SHALL** display the demo price with a label indicating it is a demo/prototype price.

**SHALL** display a CTA "View passes" navigating to Pass selection.

**WHEN** an attraction is soft-deleted, **SHALL** return a 404 or redirect to Explore.

---

### Data requirements

**WHERE** attraction data is required, **SHALL** use seeded demo data for the pilot corridor.

**SHALL** include at minimum 6 demo attractions across Heritage, Culture, Experience, and Coastal categories.

**SHALL** include attractions in both Chennai and Mahabalipuram.

---

## Out of scope (MVP)

- Real-time availability
- Live ticket inventory
- User reviews and ratings
- Map view (may be added in UX refinement phase)
- Booking from attraction detail (flow goes via Pass selection)
