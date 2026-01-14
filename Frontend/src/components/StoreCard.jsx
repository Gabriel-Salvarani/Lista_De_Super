import { useState } from 'react';
import axios from 'axios';

// Definimos la URL base para no repetirla y facilitar cambios
const API_URL = 'https://lista-de-super.onrender.com/api/stores'; 

const StoreCard = ({ store }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState(store.items || []);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false); // Para evitar doble clic

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editQty, setEditQty] = useState(1);
  const [editPrice, setEditPrice] = useState(0);

  const calculateTotal = () => {
    return items.reduce((acc, item) => acc + (Number(item.price || 0) * Number(item.quantity || 1)), 0).toFixed(2);
  };

  // --- HANDLERS CORREGIDOS ---

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!itemName.trim() || loading) return;
    setLoading(true);
    try {
      const res = await axios.patch(`${API_URL}/${store._id}/items`, {
        name: itemName, 
        quantity: Number(quantity), 
        price: Number(price)
      });
      setItems(res.data?.items || []);
      setItemName(''); setQuantity(1); setPrice(0);
    } catch (err) { console.error("Error al añadir:", err); }
    finally { setLoading(false); }
  };

  const handleDeleteStore = async () => {
    if (!window.confirm(`¿Seguro que quieres borrar la tienda ${store.name}?`)) return;
    try {
      await axios.delete(`${API_URL}/${store._id}`);
      window.location.reload(); 
    } catch (err) {
      console.error("Error al borrar tienda:", err);
      alert("Error al borrar tienda. Verifica la conexión.");
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm("¿Borrar producto?")) return;
    try {
      const res = await axios.delete(`${API_URL}/${store._id}/items/${itemId}`);
      setItems(res.data?.items || []);
    } catch (err) { 
      console.error("Error al borrar item:", err);
    }
  };

  const togglePurchased = async (itemId) => {
    try {
      const res = await axios.patch(`${API_URL}/${store._id}/items/${itemId}`);
      setItems(res.data?.items || []);
    } catch (err) { console.error(err); }
  };

  const handleUpdateItem = async (itemId) => {
    try {
      const res = await axios.put(`${API_URL}/${store._id}/items/${itemId}`, {
        name: editName, 
        quantity: Number(editQty), 
        price: Number(editPrice)
      });
      setItems(res.data?.items || []);
      setEditingId(null);
    } catch (err) { console.error(err); }
  };

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', borderRadius: '24px', padding: '24px', width: '350px',
        boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.1)' : '0 10px 25px rgba(0,0,0,0.05)',
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)', transition: 'all 0.3s ease', border: '1px solid #fff', position: 'relative'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div>
          <h3 style={{ margin: 0, fontWeight: '800' }}>{store.name}</h3>
          <p style={{ color: '#888', fontSize: '0.8rem', margin: '4px 0' }}>📍 {store.location || "Sin ubicación"}</p>
        </div>
        {/* BOTÓN CORREGIDO PARA USAR handleDeleteStore */}
        <button onClick={handleDeleteStore} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>🗑️</button>
      </div>

      <button onClick={() => setIsOpen(!isOpen)} style={{ width: '100%', padding: '12px', marginTop: '10px', borderRadius: '12px', border: 'none', backgroundColor: isOpen ? '#f0f2f5' : '#007AFF', color: isOpen ? '#555' : '#fff', fontWeight: '700', cursor: 'pointer' }}>
        {isOpen ? 'Ocultar' : 'Ver Productos'}
      </button>

      {isOpen && (
        <div style={{ marginTop: '20px' }}>
          <form onSubmit={handleAddItem} style={{ display: 'grid', gridTemplateColumns: '1fr 50px 70px 40px', gap: '5px', marginBottom: '15px' }}>
            <input type="text" placeholder="Item" value={itemName} onChange={(e) => setItemName(e.target.value)} style={{ padding: '8px', borderRadius: '8px', border: '1px solid #ddd' }} />
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} style={{ padding: '8px', borderRadius: '8px', border: '1px solid #ddd' }} min="1" />
            <input type="number" placeholder="$" value={price} onChange={(e) => setPrice(e.target.value)} style={{ padding: '8px', borderRadius: '8px', border: '1px solid #ddd' }} />
            <button type="submit" disabled={loading} style={{ background: '#007AFF', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}>{loading ? '...' : '+'}</button>
          </form>

          <ul style={{ listStyle: 'none', padding: 0 }}>
            {items?.map(item => (
              <li key={item._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', borderRadius: '14px', backgroundColor: '#fff', marginBottom: '8px', border: '1px solid #f0f0f0' }}>
                {editingId === item._id ? (
                  <div style={{ display: 'flex', gap: '5px', width: '100%' }}>
                    <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} style={{ flex: 1, padding: '4px' }} />
                    <input type="number" value={editQty} onChange={(e) => setEditQty(e.target.value)} style={{ width: '40px' }} />
                    <input type="number" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} style={{ width: '60px' }} />
                    <button onClick={() => handleUpdateItem(item._id)} style={{ background: '#34c759', color: '#fff', border: 'none', borderRadius: '5px', padding: '4px 8px' }}>OK</button>
                  </div>
                ) : (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input type="checkbox" checked={item.purchased} onChange={() => togglePurchased(item._id)} />
                      <span onClick={() => { setEditingId(item._id); setEditName(item.name); setEditQty(item.quantity); setEditPrice(item.price); }} style={{ textDecoration: item.purchased ? 'line-through' : 'none', fontWeight: '600', cursor: 'pointer' }}>
                        {item.name} <small style={{ color: '#007AFF' }}>x{item.quantity}</small>
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontWeight: 'bold' }}>${(Number(item.price || 0) * Number(item.quantity || 1)).toFixed(2)}</span>
                      <button onClick={() => handleDeleteItem(item._id)} style={{ border: 'none', background: 'none', color: '#ff3b30', cursor: 'pointer' }}>✕</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>

          <div style={{ marginTop: '15px', padding: '15px', borderRadius: '15px', background: '#007AFF', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '600' }}>Total Estimado:</span>
            <span style={{ fontSize: '1.2rem', fontWeight: '800' }}>${calculateTotal()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreCard;
