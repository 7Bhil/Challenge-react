import { Route, Router, Routes } from 'react-router-dom'
import Home from '../pages/public/Home'
import Profil from '../components/Profil'
import Leaderboard from '../components/leaderboard'
import Login from '../pages/signin/Login'
import Register from '../pages/signin/Register'
import ChallengesList from '../components/ChallengesList'
import ChallengeDetail from '../components/ChallengeDetail'

export default function AppRoutes(){
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/challenges" element={<ChallengesList />} />
          <Route path="/challenge/:id" element={<ChallengeDetail />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile/:userId" element={<Profil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}