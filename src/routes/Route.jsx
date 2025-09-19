import { Route, Routes } from 'react-router-dom'
import Home from '../pages/public/Home'
import Profil from '../pages/public/Profil'
export default function AppRoutes(){
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profil" element={<Profil />} />
    </Routes>
    </>
  )
}