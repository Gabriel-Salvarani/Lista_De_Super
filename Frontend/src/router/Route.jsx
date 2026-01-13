import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import AddStore from '../pages/AddStore';
import StoreDetail from '../pages/StoreDetail'; // La página que crearemos ahora

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add-store",
    element: <AddStore />,
  },
  {
    path: "/store/:id", // El :id es un parámetro que React leerá de la URL
    element: <StoreDetail />,
  },
]);