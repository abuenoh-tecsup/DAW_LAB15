import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

function FormProducto() {
  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    categoria: { id: "" },
  });
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/categorias")
      .then((res) => setCategorias(res.data));
    if (id) {
      axios.get(`http://localhost:8080/api/v1/productos/${id}`).then((res) =>
        setProducto({
          ...res.data,
          categoria: { id: res.data.categoria?.id || "" },
        })
      );
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "categoria") {
      setProducto({ ...producto, categoria: { id: value } });
    } else {
      setProducto({ ...producto, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...producto,
      precio: parseFloat(producto.precio),
    };
    if (id) {
      await axios.put(`http://localhost:8080/api/v1/productos/${id}`, payload);
    } else {
      await axios.post("http://localhost:8080/api/v1/productos", payload);
    }
    navigate("/productos");
  };

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h2>{id ? "Editar Producto" : "Nuevo Producto"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre:</label>
            <input
              name="nombre"
              value={producto.nombre}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Precio:</label>
            <input
              type="number"
              name="precio"
              value={producto.precio}
              onChange={handleChange}
              className="form-control"
              required
              step="0.01"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Categoría:</label>
            <select
              name="categoria"
              value={producto.categoria.id}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary" type="submit">
            Guardar
          </button>
          <button
            onClick={() => navigate("/productos")}
            className="btn btn-secondary ms-2"
          >
            Cancelar
          </button>
        </form>
      </div>
    </>
  );
}

export default FormProducto;
