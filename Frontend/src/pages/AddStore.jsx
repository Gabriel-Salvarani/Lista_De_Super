import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createStore } from '../services/StoreServices';

const AddStore = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("El nombre es obligatorio");

    try {
      await createStore({ name, location });
      navigate('/'); // Volvemos al inicio para ver la nueva tarjeta
    } catch (error) {
      console.error("Error al crear:", error);
      alert("No se pudo crear la tienda");
    }
  };

  // Estilos constantes
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    padding: '20px'
  };

  const formCardStyle = {
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(15px)',
    borderRadius: '28px',
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    textAlign: 'center'
  };

  const inputStyle = {
    width: '100%',
    padding: '14px',
    marginBottom: '20px',
    borderRadius: '12px',
    border: '1px solid #e0e0e0',
    backgroundColor: '#f9f9f9',
    fontSize: '1rem',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const submitBtnStyle = {
    width: '100%',
    padding: '14px',
    borderRadius: '14px',
    border: 'none',
    backgroundColor: '#007AFF',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0, 122, 255, 0.3)',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={containerStyle}>
      <Link to="/" style={{ marginBottom: '20px', color: '#007AFF', textDecoration: 'none', fontWeight: '600' }}>
        ← Volver a mis listas
      </Link>
      
      <div style={formCardStyle}>
        <h2 style={{ fontSize: '2rem', marginBottom: '10px', fontWeight: '800', color: '#1d1d1f' }}>Nueva Tienda</h2>
        <p style={{ color: '#86868b', marginBottom: '30px' }}>¿Dónde vas a comprar hoy?</p>
        
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Nombre (ej: Carrefour)" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            required 
          />
          <input 
            type="text" 
            placeholder="Ubicación (ej: Av. Rivadavia)" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={inputStyle}
          />
          <button 
            type="submit" 
            style={submitBtnStyle}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Crear Lista
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStore;