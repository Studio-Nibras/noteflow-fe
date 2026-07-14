import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Sword, Wifi } from "lucide-react";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

import { getPendingBattles, acceptBattle } from "../services/battleApi";

export default function BattleLobby() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joiningId, setJoiningId] = useState(null);

  useEffect(() => {
    fetchBattles();
  }, []);

  const fetchBattles = async () => {
    try {
      setLoading(true);

      const res = await getPendingBattles();

      setSessions(res.sessions || []);
    } catch (err) {
      console.error(err);
      alert("Gagal mengambil daftar battle.");
    } finally {
      setLoading(false);
    }
  };

  const joinBattle = async (session) => {
    try {
      setJoiningId(session.id);

      await acceptBattle(session.id);

      navigate(`/quiz/battle/${session.id}`);
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Gagal bergabung ke battle.");
    } finally {
      setJoiningId(null);
    }
  };

  const filteredSessions = sessions.filter((session) => {
    const hostName = session.host?.full_name?.toLowerCase() || "";

    const quizTitle = session.quisis?.title?.toLowerCase() || "";

    const key = keyword.toLowerCase();

    return hostName.includes(key) || quizTitle.includes(key);
  });

  return (
    <div className="mx-auto max-w-6xl">
      {/* HEADER */}

      <div className="rounded-3xl bg-gradient-to-r from-red-500 to-orange-500 p-10 text-white">
        <div className="flex items-center gap-4">
          <Sword size={38} />

          <div>
            <h1 className="text-4xl font-bold">Battle Quiz</h1>

            <p className="mt-2 text-red-100">
              Bergabunglah ke battle yang sedang menunggu pemain.
            </p>
          </div>
        </div>
      </div>

      {/* SEARCH */}

      <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <Search />

          <h2 className="text-2xl font-bold">Cari Battle</h2>
        </div>

        <Input
          placeholder="Cari host atau judul quiz..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      {/* LIST */}

      <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
        <h2 className="mb-8 text-2xl font-bold">Battle Tersedia</h2>

        {loading ? (
          <div className="py-10 text-center text-gray-500">
            Memuat battle...
          </div>
        ) : filteredSessions.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            Belum ada battle tersedia.
          </div>
        ) : (
          <div className="space-y-5">
            {filteredSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between rounded-2xl border border-slate-200 p-5"
              >
                <div className="flex items-center gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-xl font-bold text-red-600">
                    {session.host?.full_name
                      ? session.host.full_name.charAt(0).toUpperCase()
                      : "?"}
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">
                      {session.host?.full_name || "Unknown Player"}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {session.quisis?.title}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <Wifi size={16} className="text-green-500" />

                      <span className="text-sm text-green-500">
                        Waiting Player
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  disabled={joiningId === session.id}
                  onClick={() => joinBattle(session)}
                >
                  {joiningId === session.id ? "Joining..." : "Join Battle"}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
