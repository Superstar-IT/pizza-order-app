# Pizza Ordering Application

## 🚀 Live Demo

**Try it out:** [View Live Demo](https://pizza-order-app-k6im.vercel.app/)

## Features

- **Browse Pizza Menu**: View all available pizzas loaded from `pizzas.json`
- **Filter & Search**: Filter pizzas by ingredient, category, price range, and search by name
- **Sorting**: Sort pizzas by name (A-Z, Z-A) or price (low to high, high to low)
- **Order Management**: Add pizzas to order with quantities, update quantities, and remove items
- **Discount System**: Automatic 10% discount when ordering 3 or more of the same pizza
- **Order Summary**: Real-time order summary with subtotal, discounts, and total
- **Order Confirmation**: Confirm and persist orders to local storage simulation
- **Add New Pizzas**: Form to add new pizzas to the menu with validation
- **Data Visualizations**: 
  - Bar chart showing pizza prices
  - Pie chart showing order distribution by quantity
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Routing**: Single-page app with React Router (Dashboard, Pizza Details, Add Pizza)

## Tech Stack

- **React 18** with TypeScript
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Jest** and **React Testing Library** for testing
- **Vite** as build tool
- **ESLint** and **Prettier** for code quality

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx
│   ├── PizzaCard.tsx
│   ├── OrderSummary.tsx
│   ├── PriceChart.tsx
│   └── OrderDistributionChart.tsx
├── pages/              # Page components
│   ├── Dashboard.tsx
│   ├── PizzaDetails.tsx
│   └── AddPizza.tsx
├── store/              # Redux store configuration
│   ├── slices/
│   │   ├── pizzaSlice.ts
│   │   ├── filterSlice.ts
│   │   └── orderSlice.ts
│   ├── index.ts
│   └── hooks.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   ├── filterAndSort.ts
│   └── orderStorage.ts
├── data/               # Data files
│   └── pizzas.json
└── test/               # Test setup
    └── setup.ts
```

## Setup and Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Run tests:**
   ```bash
   npm test
   ```

5. **Lint code:**
   ```bash
   npm run lint
   ```

6. **Format code:**
   ```bash
   npm run format
   ```

## Data Structure

### pizzas.json

The pizza menu is loaded from `src/data/pizzas.json`. Each pizza has the following structure:

```json
{
  "id": "string",
  "name": "string",
  "price": "number",
  "ingredients": ["string"],
  "category": "string",
  "imageUrl": "string (optional)"
}
```

### Orders Storage

Orders are persisted using an in-memory storage simulation (`orderStorage`). In a production environment, this would be replaced with:
- LocalStorage for client-side persistence
- API calls to a backend service

Order structure:
```typescript
{
  id: string;
  items: OrderItem[];
  subtotal: number;
  totalDiscount: number;
  total: number;
  timestamp: string;
}
```

## Discount Rules

- **Quantity Discount**: When a user orders 3 or more of the same pizza, that line item receives a 10% discount
- The discount is calculated per line item, not on the entire order
- Discounts are clearly displayed in the order summary

Example:
- Order 3x Margherita ($5 each)
- Original price: $15
- Discount (10%): $1.50
- Final price: $13.50

## Design Decisions

### State Management: Redux Toolkit

**Why Redux?**
- Centralized state management for complex application state
- Predictable state updates with reducers
- Excellent developer tools for debugging
- Easy to test and maintain
- Better for larger applications with multiple state slices

The application uses three main slices:
- `pizzaSlice`: Manages pizza menu data
- `filterSlice`: Manages filter and sort state
- `orderSlice`: Manages current order and order history

### UI Framework: Tailwind CSS

**Why Tailwind?**
- Utility-first CSS framework for rapid development
- Responsive design made easy
- Consistent design system
- Small bundle size with purging
- Modern and widely adopted

### Charting Library: Recharts

**Why Recharts?**
- Built specifically for React
- Composable and flexible
- Good TypeScript support
- Responsive by default
- Active maintenance

### Routing: React Router v6

**Why React Router?**
- Industry standard for React routing
- Declarative routing with JSX
- Excellent TypeScript support
- Easy to implement nested routes

## Testing

Tests are written using Jest and React Testing Library. Test files are located alongside the code they test with the `.test.ts` or `.test.tsx` extension.

Key areas covered:
- Utility functions (filtering, sorting)
- Redux reducers (order management, discount calculation)
- Form validation (Add Pizza form)

To run tests:
```bash
npm test
```

To run tests in watch mode:
```bash
npm test:watch
```

## Additional Features

1. **Real-time Updates**: All filters, sorting, and order changes update immediately without page reloads
2. **Quantity Management**: Easy increment/decrement controls in the order summary
3. **Success Feedback**: Visual confirmation when orders are placed
4. **Error Handling**: Form validation with user-friendly error messages
5. **Image Fallbacks**: Graceful handling of missing pizza images
6. **Sticky Order Summary**: Order summary stays visible while scrolling on desktop
