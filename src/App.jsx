import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import useAuth from "./hooks/useAuth";
import { supabase } from "./services/supabase";

import Landing from "./pages/Landing";
import Workspace from "./pages/Workspace";
import History from "./pages/History";
import QuizHomePage from "./pages/QuizHomePage";
import QuizPage from "./pages/QuizPage";
import FindPlayer from "./pages/FindPlayer";
import BattleRoom from "./pages/BattleRoom";
import BattleResult from "./pages/BattleResult";
import MindMap from "./pages/MindMap";
import OverviewPage from "./pages/OverviewPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import FAQ from "./pages/FAQ";
import WaitingRoom from "./pages/WaitingRoom";

import AppLayout from "./layouts/AppLayout";

export default function App() {
  useAuth();

  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase.auth.getSession();

      console.log("===== SUPABASE CONNECTION =====");
      console.log("Session:", data.session);
      console.log("Error:", error);
      console.log("===============================");
    };

    testConnection();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<AppLayout />}>
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/history" element={<History />} />
          <Route path="/quiz" element={<QuizHomePage />} />

          <Route path="/quiz/solo" element={<QuizPage />} />
          <Route path="/quiz/battle" element={<FindPlayer />} />
          <Route path="/quiz/battle/:sessionId" element={<BattleRoom />} />
          <Route
            path="/quiz/battle/result/:sessionId"
            element={<BattleResult />}
          />
          <Route path="/mindmap" element={<MindMap />} />
          <Route path="/overview" element={<OverviewPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/quiz/battle/waiting" element={<WaitingRoom />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
