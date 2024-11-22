import { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function PropiedadesAdmin() {
  const [propiedades, setPropiedades] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPropiedad, setCurrentPropiedad] = useState(null);

  useEffect(() => {
    fetch('/api/propiedades')
      .then(res => res.json())
      .then(setPropiedades);
  }, []);

  const handleEdit = (propiedad) => {
    setCurrentPropiedad(propiedad);
    setModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Propiedades</h1>
        <button
          onClick={() => {
            setCurrentPropiedad(null);
            setModalOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Nueva Propiedad
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Título
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Zona
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {propiedades.map((propiedad) => (
              <tr key={propiedad.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {propiedad.titulo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {propiedad.precio.toLocaleString('es-ES', {
                    style: 'currency',
                    currency: 'EUR'
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${propiedad.estado === 'en venta' ? 'bg-green-100 text-green-800' : 
                      propiedad.estado === 'reservado' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {propiedad.estado}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {propiedad.zona}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(propiedad)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => {/* Implementar eliminación */}}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}