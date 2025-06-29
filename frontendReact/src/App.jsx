import { Routes, Route, Navigate } from 'react-router-dom';

import EmpleadoList from './components/EmpleadoList';
import FormEmpleado from './components/FormEmpleado';

import ProductoList from './components/ProductoList';
import FormProducto from './components/FormProducto';

import CategoriaList from './components/CategoriaList';
import FormCategoria from './components/FormCategoria';

function App() {
  return (
    <Routes>
      {/* Rutas para Empleados */}
      <Route path="/" element={<EmpleadoList />} />
      <Route path="/add" element={<FormEmpleado />} />
      <Route path="/edit/:id" element={<FormEmpleado />} />

      {/* Rutas para Productos */}
      <Route path="/productos" element={<ProductoList />} />
      <Route path="/productos/add" element={<FormProducto />} />
      <Route path="/productos/edit/:id" element={<FormProducto />} />

      {/* Rutas para Categorías */}
      <Route path="/categorias" element={<CategoriaList />} />
      <Route path="/categorias/add" element={<FormCategoria />} />
      <Route path="/categorias/edit/:id" element={<FormCategoria />} />

      {/* Redirección en caso de ruta no encontrada */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
