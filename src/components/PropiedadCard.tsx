import Image from 'next/image';
import { FaBed, FaBath, FaRuler } from 'react-icons/fa';

export default function PropiedadCard({ propiedad }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image
          src={propiedad.imagenes[0]}
          alt={propiedad.titulo}
          layout="fill"
          objectFit="cover"
        />
        {propiedad.estado === 'reservado' && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded">
            Reservado
          </div>
        )}
      </div>

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{propiedad.titulo}</h2>
        <p className="text-gray-600 mb-4">{propiedad.descripcion}</p>

        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-blue-600">
            {propiedad.precio.toLocaleString('es-ES', {
              style: 'currency',
              currency: 'EUR',
            })}
          </span>
          <span className="text-sm text-gray-500">{propiedad.zona}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <div className="flex items-center">
            <FaBed className="mr-1" />
            <span>{propiedad.habitaciones}</span>
          </div>
          <div className="flex items-center">
            <FaBath className="mr-1" />
            <span>{propiedad.banos}</span>
          </div>
          <div className="flex items-center">
            <FaRuler className="mr-1" />
            <span>{propiedad.metros}m²</span>
          </div>
        </div>
      </div>
    </div>
  );
}