import { Route, Router, Routes } from 'react-router-dom'
import Home from '../pages/public/Home'
import Profil from '../components/Profil'
import Leaderboard from '../components/leaderboard'
export default function AppRoutes(){
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile/:userId" element={<Profil />} />
      </Routes>
    </>
  )
}