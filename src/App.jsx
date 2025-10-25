import { BrowserRouter, useLocation } from "react-router-dom"; // <-- NOUVEAU: Import de useLocation
import AppRoutes from "./routes/Route";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Composant interne pour gérer la mise en page conditionnelle
function Layout() {
  const location = useLocation(); // <-- Appel du hook pour obtenir le chemin
  
  // Tableau des chemins où Navbar et Footer doivent être cachés
  const noLayoutPaths = ["/login", "/register"]; 
  
  // Vérifie si le chemin actuel est un de ceux à cacher
  const shouldHideLayout = noLayoutPaths.includes(location.pathname); 

  return (
    <>
      {/* Condition: Afficher Navbar UNIQUEMENT si shouldHideLayout est false */}
      {!shouldHideLayout && <Navbar />}
      
      {/* Les routes sont toujours affichées */}
      <AppRoutes />
      
      {/* Condition: Afficher Footer UNIQUEMENT si shouldHideLayout est false */}
      {!shouldHideLayout && <Footer />}
    </>
  );
}

export default function App() {
  return (
    // On englobe Layout dans BrowserRouter
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
