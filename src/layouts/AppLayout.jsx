import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, Sparkles } from "lucide-react";

import Sidebar from "../components/layout/Sidebar";
import BattleInvitationModal from "../components/battle/BattleInvitationModal";

import { getPendingBattles, acceptBattle } from "../services/battleApi";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [battleOpen, setBattleOpen] = useState(false);
  const [battle, setBattle] = useState(null);

  const navigate = useNavigate();

  const fetchPendingBattle = async () => {
    try {
      const res = await getPendingBattles();

      if (!battleOpen && res.success && res.battles.length > 0) {
        setBattle((prev) => {
          if (prev?.id === res.battles[0].id) return prev;

          setBattleOpen(true);
          return res.battles[0];
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPendingBattle();

    const interval = setInterval(fetchPendingBattle, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleAccept = async () => {
    try {
      await acceptBattle(battle.id);

      setBattle(null);
      setBattleOpen(false);

      navigate(`/quiz/battle/${battle.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDecline = () => {
    setBattleOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header */}

        <header className="sticky top-0 z-30 md:hidden">
          <div className="mx-3 mt-3 flex items-center justify-between rounded-2xl bg-white/90 px-4 py-3 shadow-lg shadow-slate-200/40 backdrop-blur-xl">
            <button
              onClick={() => setSidebarOpen(true)}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                transition-all
                duration-200
                hover:bg-slate-100
                active:scale-95
              "
            >
              <Menu size={22} strokeWidth={2.3} />
            </button>

            <h1 className="text-lg font-black tracking-tight">
              <span className="text-slate-900">Note</span>

              <span className="text-blue-500">Flow</span>
            </h1>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-[#6A00F4]/10 to-[#17B6D7]/10">
              <Sparkles size={18} className="text-violet-600" />
            </div>
          </div>
        </header>

        <div className="px-4 pb-4 pt-5 md:p-8">
          <Outlet />
        </div>
      </main>

      <BattleInvitationModal
        open={battleOpen}
        battle={battle}
        onAccept={handleAccept}
        onDecline={handleDecline}
      />
    </div>
  );
}
