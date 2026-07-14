import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader2, Users } from "lucide-react";

import Button from "../components/ui/Button";
import { getBattleSession } from "../services/battleApi";

export default function WaitingRoom() {
  const navigate = useNavigate();
  const location = useLocation();

  const session = location.state?.session;
  const guest = location.state?.guest;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      navigate("/quiz");
      return;
    }

    const interval = setInterval(async () => {
      try {
        const data = await getBattleSession(session.id);

        if (data.session.status !== "waiting") {
          clearInterval(interval);

          navigate(`/quiz/battle/${session.id}`);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center">
      <div className="w-full rounded-3xl bg-white p-10 text-center shadow">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
          <Users className="text-blue-600" size={40} />
        </div>

        <h1 className="mt-6 text-3xl font-bold">Menunggu Lawan...</h1>

        <p className="mt-4 text-slate-500">Undangan telah dikirim ke</p>

        <h2 className="mt-2 text-xl font-semibold">{guest?.full_name}</h2>

        <div className="mt-10 flex justify-center">
          {loading ? (
            <Loader2 className="animate-spin" size={36} />
          ) : (
            <Loader2 className="animate-spin" size={36} />
          )}
        </div>

        <p className="mt-5 text-slate-500">
          Menunggu pemain menerima undangan...
        </p>

        <Button
          className="mt-10 bg-red-500 hover:bg-red-600"
          onClick={() => navigate("/quiz")}
        >
          Batalkan
        </Button>
      </div>
    </div>
  );
}
