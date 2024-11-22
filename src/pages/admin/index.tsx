import { useSession, signIn } from 'next-auth/react';
import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import Dashboard from '../../components/admin/Dashboard';
import PropiedadesAdmin from '../../components/admin/PropiedadesAdmin';
import ClientesAdmin from '../../components/admin/ClientesAdmin';

export default function Admin() {
  const { data: session, status } = useSession();
  const [currentView, setCurrentView] = useState('dashboard');

  if (status === 'loading') {
    return <div>Cargando...</div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <button
          onClick={() => signIn()}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Iniciar Sesión
        </button>
      </div>
    );
  }

  return (
    <AdminLayout currentView={currentView} setCurrentView={setCurrentView}>
      {currentView === 'dashboard' && <Dashboard />}
      {currentView === 'propiedades' && <PropiedadesAdmin />}
      {currentView === 'clientes' && <ClientesAdmin />}
    </AdminLayout>
  );
}