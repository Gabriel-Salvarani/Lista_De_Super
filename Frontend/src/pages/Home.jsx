import { useEffect, useState } from 'react';
import { getStores } from '../services/StoreServices';
import { Link } from 'react-router-dom';
import StoreCard from '../components/StoreCard';

const Home = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    getStores().then(data => setStores(data));
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      
      {/* SECCIÓN DEL TÍTULO */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '40px' 
      }}>
        <div>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '800', 
            margin: 0, 
            letterSpacing: '-1px',
            background: 'linear-gradient(90deg, #007AFF, #00C6FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Mis Listas
          </h1>
          <p style={{ color: '#666', marginTop: '5px' }}>Tienes {stores.length} tiendas configuradas</p>
        </div>

        <Link to="/add-store" style={{ textDecoration: 'none' }}>
          <button style={{ 
            backgroundColor: '#007AFF', 
            color: 'white', 
            padding: '12px 24px', 
            borderRadius: '14px', 
            border: 'none', 
            fontWeight: '600', 
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0, 122, 255, 0.3)',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            + Nueva Tienda
          </button>
        </Link>
      </header>

      {/* GRILLA DE TARJETAS */}
      <div style={{ 
        display: 'grid', 
         // 'auto-fit' es mejor que 'auto-fill' para centrar cuando hay pocas tarjetas
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '30px',
        width: '100%',
        maxWidth: '1200px', // Limita el ancho en pantallas gigantes
        justifyContent: 'center', 
        justifyItems: 'center',
        padding: '0 10px', // Evita que toquen los bordes del navegador
        boxSizing: 'border-box'
      }}>
        {stores.map(store => (
          <div key={store._id} style={{ animation: 'fadeIn 0.5s ease' }}>
            <StoreCard store={store} />
          </div>
        ))}
      </div>

      {stores.length === 0 && (
        <div style={{ textAlign: 'center', marginTop: '100px', color: '#888' }}>
          <p fontSize="1.2rem">Tu despensa está vacía. ¡Agrega una tienda para empezar!</p>
        </div>
      )}
    </div>
  );
};

export default Home;