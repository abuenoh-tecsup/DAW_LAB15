import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

function CategoriaList() {
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  const cargarCategorias = async () => {
    const res = await axios.get("http://localhost:8080/api/v1/categorias");
    setCategorias(res.data);
  };

  const eliminarCategoria = async (id) => {
    await axios.delete(`http://localhost:8080/api/v1/categorias/${id}`);
    cargarCategorias();
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h2 className="text-center">Lista de Categorías</h2>
        <button
          onClick={() => navigate("/categorias/add")}
          className="btn btn-success mb-2"
        >
          Nueva Categoría
        </button>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.nombre}</td>
                <td>
                  <button
                    onClick={() => navigate(`/categorias/edit/${cat.id}`)}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarCategoria(cat.id)}
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

export default CategoriaList;
