import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";

function FormCategoria() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [categoria, setCategoria] = useState({
    nombre: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`${API_URL}/categorias/${id}`)
        .then((res) => setCategoria(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setCategoria({ ...categoria, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(
        `${API_URL}/categorias/${id}`,
        categoria
      );
    } else {
      await axios.post(`${API_URL}/categorias`, categoria);
    }
    navigate("/categorias");
  };

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h2>{id ? "Editar Categoría" : "Nueva Categoría"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre:</label>
            <input
              name="nombre"
              value={categoria.nombre}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Guardar
          </button>
          <button
            onClick={() => navigate("/categorias")}
            className="btn btn-secondary ms-2"
          >
            Cancelar
          </button>
        </form>
      </div>
    </>
  );
}

export default FormCategoria;
