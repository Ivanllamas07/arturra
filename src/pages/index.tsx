import { useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { prisma } from '../lib/prisma';
import PropiedadCard from '../components/PropiedadCard';
import Filtros from '../components/Filtros';

export default function Home({ propiedades, zonas }) {
  const [filteredPropiedades, setFilteredPropiedades] = useState(propiedades);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Inmobiliaria Arturra - Tu hogar ideal</title>
        <meta name="description" content="Encuentra tu próximo hogar con Inmobiliaria Arturra" />
      </Head>

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Inmobiliaria Arturra
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Filtros zonas={zonas} onFilter={setFilteredPropiedades} />
        
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPropiedades.map((propiedad) => (
            <PropiedadCard key={propiedad.id} propiedad={propiedad} />
          ))}
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const propiedades = await prisma.propiedad.findMany({
    where: { estado: 'en venta' },
  });

  const zonas = [...new Set(propiedades.map(p => p.zona))];

  return {
    props: {
      propiedades: JSON.parse(JSON.stringify(propiedades)),
      zonas,
    },
  };
}