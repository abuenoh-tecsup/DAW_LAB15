import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

function ProductoList() {
  const API_URL = import.meta.env.VITE_API_URL;
  
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  const cargarProductos = async () => {
    const res = await axios.get(`${API_URL}/productos`);
    setProductos(res.data);
  };

  const eliminarProducto = async (id) => {
    await axios.delete(`${API_URL}/productos/${id}`);
    cargarProductos();
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h2 className="text-center">Lista de Productos</h2>
        <button
          onClick={() => navigate("/productos/add")}
          className="btn btn-success mb-2"
        >
          Nuevo Producto
        </button>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.nombre}</td>
                <td>{prod.precio}</td>
                <td>{prod.categoria?.nombre || "Sin categoría"}</td>
                <td>
                  <button
                    onClick={() => navigate(`/productos/edit/${prod.id}`)}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarProducto(prod.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProductoList;
