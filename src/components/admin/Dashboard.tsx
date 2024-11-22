import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

export default function Dashboard() {
  const [stats, setStats] = useState({
    propiedadesActivas: 0,
    visitasPendientes: 0,
    ingresosMensuales: 0,
  });

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(setStats);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Panel de Control</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Propiedades Activas</h3>
          <p className="text-3xl font-bold">{stats.propiedadesActivas}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Visitas Pendientes</h3>
          <p className="text-3xl font-bold">{stats.visitasPendientes}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Ingresos Mensuales</h3>
          <p className="text-3xl font-bold">
            {stats.ingresosMensuales.toLocaleString('es-ES', {
              style: 'currency',
              currency: 'EUR'
            })}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Evolución de Precios</h3>
        <div className="h-64">
          <Line
            data={{
              labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
              datasets: [{
                label: 'Precio Medio',
                data: [300000, 305000, 302000, 308000, 310000, 315000],
                borderColor: 'rgb(59, 130, 246)',
                tension: 0.1
              }]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false
            }}
          />
        </div>
      </div>
    </div>
  );
}