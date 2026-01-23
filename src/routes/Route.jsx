import { Route, Routes } from "react-router-dom";
import Profil from "../components/Profil";
import Leaderboard from "../components/leaderboard";
import JurySubmissions from "../components/Notes";
import Login from "../pages/signin/Login";
import Register from "../pages/signin/Register";
import ChallengesList from "../components/ChallengesList";
import ChallengeDetail from "../components/ChallengeDetail";
import Homee from "../pages/Homee";
import CreateChallenge from "../pages/Admin/CreationChallenges";
import AdminChallenges from "../pages/Admin/GestionChallenges";
import EditChallenge from "../pages/Admin/ModifChallenge";
import UserManagement from "../pages/Admin/UserManagement";
import SuperAdminChallenges from "../pages/SuperAdmin/AllChallenges";
import ChallengeValidation from "../pages/SuperAdmin/ChallengeValidation";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homee />} />
        <Route path="/home" element={<Homee />} />
        <Route path="/challenges" element={<ChallengesList />} />
        <Route path="/challenge/:id" element={<ChallengeDetail />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile/:userId" element={<Profil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Admin Routes */}
        <Route path="/creation-challenge" element={<CreateChallenge />} />
        <Route path="/admin/challenges" element={<AdminChallenges />} />
        <Route path="/edit-challenge/:id" element={<EditChallenge />} />
        
        {/* SuperAdmin Routes */}
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/validation" element={<ChallengeValidation />} />
        <Route path="/jury/submissions" element={<JurySubmissions />} />
      </Routes>

    </>
  );
}
