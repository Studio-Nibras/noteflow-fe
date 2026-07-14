import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Swords, BookOpen, CheckCircle2 } from "lucide-react";

import { getQuizList } from "../services/battleApi";
import Button from "../components/ui/Button";
import { supabase } from "../services/supabase";

export default function QuizHomePage() {
  const navigate = useNavigate();

  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchQuizList = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          console.error("User belum login");
          return;
        }

        const res = await getQuizList(user.id);

        if (isMounted) {
          setMaterials(res?.data?.quizzes || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchQuizList();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="rounded-3xl bg-linear-to-r from-blue-600 to-cyan-500 p-10 text-white shadow-lg">
        <h1 className="text-4xl font-bold">Quiz</h1>

        <p className="mt-3 max-w-2xl leading-7 text-blue-100">
          Uji pemahamanmu dengan mengerjakan quiz secara mandiri atau tantang
          temanmu dalam Battle Quiz.
        </p>
      </div>

      <div className="mt-10">
        <div className="flex items-center gap-3">
          <BookOpen size={24} />
          <h2 className="text-2xl font-bold">Pilih Materi</h2>
        </div>

        <p className="mt-2 text-slate-500">
          Pilih salah satu materi sebelum memulai quiz.
        </p>

        <div className="mt-6 max-h-[26rem] space-y-4 overflow-y-auto pr-2">
          {loading ? (
            <p className="text-slate-500">Memuat materi...</p>
          ) : materials.length === 0 ? (
            <p className="text-slate-500">Belum ada materi quiz.</p>
          ) : (
            materials.map((material) => {
              const active = selectedMaterial?.id === material.id;

              return (
                <div
                  key={material.id}
                  onClick={() => setSelectedMaterial(material)}
                  className={`cursor-pointer rounded-2xl border bg-white p-6 shadow-sm transition-all ${
                    active
                      ? "border-blue-500 ring-2 ring-blue-100"
                      : "border-slate-200 hover:border-blue-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {material.title}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {material.created_at
                          ? new Date(material.created_at).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              },
                            )
                          : "Tanggal tidak tersedia"}
                      </p>
                    </div>

                    {active && (
                      <CheckCircle2 className="text-blue-600" size={28} />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
            <Brain className="text-blue-600" size={30} />
          </div>

          <h2 className="mt-6 text-3xl font-bold text-blue-600">
            Quiz Mandiri
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Kerjakan quiz secara mandiri untuk mengukur pemahamanmu terhadap
            materi yang telah dipelajari.
          </p>

          <Button
            className="mt-8 w-full"
            disabled={!selectedMaterial}
            onClick={() =>
              navigate("/quiz/solo", {
                state: {
                  workspaceId: selectedMaterial?.id,
                },
              })
            }
          >
            Mulai Quiz
          </Button>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">
            <Swords className="text-red-500" size={30} />
          </div>

          <h2 className="mt-6 text-3xl font-bold text-red-500">Battle Quiz</h2>

          <p className="mt-4 leading-7 text-slate-600">
            Tantang temanmu untuk menjawab quiz yang sama. Siapa yang paling
            cepat dan paling banyak benar akan menjadi pemenangnya.
          </p>

          <Button
            className="mt-8 w-full bg-red-500 hover:bg-red-600"
            disabled={!selectedMaterial}
            onClick={() =>
              navigate("/quiz/battle", {
                state: {
                  quizId: selectedMaterial?.id,
                },
              })
            }
          >
            Battle Sekarang
          </Button>
        </div>
      </div>
    </div>
  );
}
