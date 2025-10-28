import { Route, Router, Routes } from "react-router-dom";
import Home from "../pages/public/Home";
import Profil from "../components/Profil";
import Leaderboard from "../components/leaderboard";
import Login from "../pages/signin/Login";
import Register from "../pages/signin/Register";
import ChallengesList from "../components//ChallengesList";
import ChallengeDetail from "../components/ChallengeDetail";
import Homee from "../pages/Homee";
import CreateChallenge from "../pages/Admin/CreationChallenges";
import AdminChallenges from "../pages/Admin/GestionChallenges";
import EditChallenge from "../pages/Admin/ModifChallenge";
import SuperAdminChallenges from "../pages/SuperAdmin/AllChallenges";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Homee />} />
        <Route path="/challenges" element={<ChallengesList />} />
        <Route path="/challenge/:id" element={<ChallengeDetail />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile/:userId" element={<Profil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/creation-challenge" element={<CreateChallenge />} />
        <Route path="/gestion-challenge" element={<AdminChallenges />} />
        <Route path="/edit-challenge/:id" element={<EditChallenge />} />
        <Route
          path="/super-gestion-challenge"
          element={<SuperAdminChallenges />}
        />
        {/*        <Route path="/jury/submissions" element={<JurySubmission />} />
       <Route path="/super-admin/users" element={<SuperAdminUsee />} />-*/}
      </Routes>
    </>
  );
}
