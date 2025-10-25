import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/Route";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { AuthProvider } from "./context/AuthContext";
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AuthProvider>
      <AppRoutes />
      </AuthProvider>
      <Footer />
    </BrowserRouter>
  );
}
