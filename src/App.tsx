import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import PizzaDetails from './pages/PizzaDetails';
import AddPizza from './pages/AddPizza';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pizza/:id" element={<PizzaDetails />} />
        <Route path="/add-pizza" element={<AddPizza />} />
      </Routes>
    </Layout>
  );
}

export default App;
