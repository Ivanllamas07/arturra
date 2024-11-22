import { useState } from 'react';

export default function Filtros({ zonas, onFilter }) {
  const [filtros, setFiltros] = useState({
    zona: '',
    precioMin: '',
    precioMax: '',
    habitaciones: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const aplicarFiltros = () => {
    onFilter(propiedades => {
      return propiedades.filter(prop => {
        const cumpleZona = !filtros.zona || prop.zona === filtros.zona;
        const cumplePrecioMin = !filtros.precioMin || prop.precio >= Number(filtros.precioMin);
        const cumplePrecioMax = !filtros.precioMax || prop.precio <= Number(filtros.precioMax);
        const cumpleHabitaciones = !filtros.habitaciones || 
          prop.habitaciones === Number(filtros.habitaciones);

        return cumpleZona && cumplePrecioMin && cumplePrecioMax && cumpleHabitaciones;
      });
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <select
          name="zona"
          value={filtros.zona}
          onChange={handleChange}
          className="border rounded p-2"
        >
          <option value="">Todas las zonas</option>
          {zonas.map(zona => (
            <option key={zona} value={zona}>{zona}</option>
          ))}
        </select>

        <input
          type="number"
          name="precioMin"
          placeholder="Precio mínimo"
          value={filtros.precioMin}
          onChange={handleChange}
          className="border rounded p-2"
        />

        <input
          type="number"
          name="precioMax"
          placeholder="Precio máximo"
          value={filtros.precioMax}
          onChange={handleChange}
          className="border rounded p-2"
        />

        <select
          name="habitaciones"
          value={filtros.habitaciones}
          onChange={handleChange}
          className="border rounded p-2"
        >
          <option value="">Habitaciones</option>
          {[1,2,3,4,5].map(num => (
            <option key={num} value={num}>{num}+ habitaciones</option>
          ))}
        </select>
      </div>

      <button
        onClick={aplicarFiltros}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Aplicar Filtros
      </button>
    </div>
  );
}