import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getBattleSession } from "../services/battleApi";

export default function BattleResult() {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await getBattleSession(sessionId);

        setSession(res.session);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Result...
      </div>
    );
  }

  const isDraw = session.winner_id === null;

  const isWinner = session.winner_id === session.host_id;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white rounded-3xl shadow-lg p-10 w-[500px] text-center">
        <h1 className="text-4xl font-bold mb-6">
          {isDraw ? "🤝 Draw!" : isWinner ? "🏆 Host Wins!" : "🏆 Guest Wins!"}
        </h1>

        <div className="space-y-3 text-xl">
          <p>Host Score : {session.host_score}</p>

          <p>Guest Score : {session.guest_score}</p>
        </div>

        <button
          onClick={() => navigate("/quiz")}
          className="mt-10 bg-blue-600 text-white rounded-xl px-8 py-3"
        >
          Back
        </button>
      </div>
    </div>
  );
}
