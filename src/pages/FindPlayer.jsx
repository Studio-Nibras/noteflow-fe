import { useEffect, useState } from "react";
import { Search, UserRound } from "lucide-react";

import Button from "../components/ui/Button";
import { searchUsers } from "../services/battleApi";

import { createBattle } from "../services/battleApi";
import { useLocation, useNavigate } from "react-router-dom";

export default function FindPlayer() {
  const [keyword, setKeyword] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const quizId = location.state?.quizId;

  const fetchUsers = async (value = "") => {
    try {
      setLoading(true);

      const res = await searchUsers(value);

      setUsers(res.users || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async (guest) => {
    try {
      const res = await createBattle({
        guestId: guest.id,
        quizId,
      });

      navigate("/quiz/battle/waiting", {
        state: {
          session: res.session,
          guest,
        },
      });
    } catch (err) {
      console.error(err);
      alert("Gagal mengirim undangan.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers(keyword);
    }, 300);

    return () => clearTimeout(timer);
  }, [keyword]);

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-4xl font-bold">Cari Teman Battle</h1>

      <p className="mt-2 text-slate-500">Cari teman yang ingin kamu tantang.</p>

      <div className="relative mt-8">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Cari nama..."
          className="w-full rounded-2xl border border-slate-300 py-4 pl-12 pr-4 outline-none focus:border-blue-500"
        />
      </div>

      <div className="mt-8 space-y-4">
        {loading ? (
          <p>Loading...</p>
        ) : users.length === 0 ? (
          <p>Tidak ada user.</p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between rounded-2xl border bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-slate-100 p-3">
                  <UserRound />
                </div>

                <div>
                  <h3 className="font-semibold">{user.full_name}</h3>

                  <p className="text-sm text-slate-500">
                    {user.username || "-"}
                  </p>
                </div>
              </div>

              <Button onClick={() => handleInvite(user)}>Invite</Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
