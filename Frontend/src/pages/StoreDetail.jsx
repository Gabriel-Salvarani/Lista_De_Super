import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const StoreDetail = () => {
  const { id } = useParams(); // Atrapamos el ID de la URL
  const [store, setStore] = useState(null);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);

  // 1. Cargar los datos de la tienda al entrar
  const fetchStore = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/stores/${id}`);
      setStore(res.data);
    } catch (err) {
      console.error("Error al cargar la tienda", err);
    }
  };

  useEffect(() => {
    fetchStore();
  }, [id]);

  // 2. Función para agregar un producto
  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!itemName.trim()) return;

    try {
      await axios.patch(`http://localhost:3000/api/stores/${id}/items`, {
        name: itemName,
        quantity: quantity
      });
      setItemName('');
      setQuantity(1);
      fetchStore(); // Recargamos para ver el nuevo item
    } catch (err) {
      alert("Error al añadir producto");
    }
  };

  // 3. Función para tachar/destachar (Toggle)
  const togglePurchased = async (itemId) => {
    try {
      await axios.patch(`http://localhost:3000/api/stores/${id}/items/${itemId}`);
      fetchStore();
    } catch (err) {
      console.error("Error al actualizar estado");
    }
  };

  if (!store) return <p>Cargando tienda...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/">← Volver a mis tiendas</Link>
      
      <h1>{store.name}</h1>
      <p>📍 {store.location || 'Sin ubicación'}</p>

      <hr />

      {/* Formulario para nuevos productos */}
      <form onSubmit={handleAddItem} style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Producto (ej: Pan)" 
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input 
          type="number" 
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={{ width: '50px', marginLeft: '10px' }}
        />
        <button type="submit" style={{ marginLeft: '10px' }}>Añadir</button>
      </form>

      {/* Lista de productos */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {store.items.map((item) => (
          <li key={item._id} style={{ 
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            textDecoration: item.purchased ? 'line-through' : 'none',
            color: item.purchased ? 'gray' : 'black'
          }}>
            <input 
              type="checkbox" 
              checked={item.purchased} 
              onChange={() => togglePurchased(item._id)}
              style={{ marginRight: '10px' }}
            />
            {item.name} (x{item.quantity})
          </li>
        ))}
      </ul>
      
      {store.items.length === 0 && <p>La lista está vacía.</p>}
    </div>
  );
};

export default StoreDetail;