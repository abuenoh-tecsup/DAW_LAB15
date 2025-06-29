import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

function EmpleadoList() {
  const [empleados, setEmpleados] = useState([]);
  const navigate = useNavigate();

  const cargarEmpleados = async () => {
    const res = await axios.get("http://localhost:8080/api/v1/empleados");
    setEmpleados(res.data);
  };

  const eliminarEmpleado = async (id) => {
    await axios.delete(`http://localhost:8080/api/v1/empleados/${id}`);
    cargarEmpleados();
  };

  useEffect(() => {
    cargarEmpleados();
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h2 className="text-center">Lista de empleados</h2>
        <button
          onClick={() => navigate("/add")}
          className="btn btn-success mb-2"
        >
          {" "}
          Nuevo Empleado{" "}
        </button>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.nombre}</td>
                <td>{emp.apellido}</td>
                <td>{emp.email}</td>
                <td>
                  <button
                    onClick={() => navigate(`/edit/${emp.id}`)}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarEmpleado(emp.id)}
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

export default EmpleadoList;
