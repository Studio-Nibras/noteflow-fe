import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getQuizByWorkspace } from "../services/quizApi";
import { createHistory } from "../services/historyApi";

import QuizHeader from "../components/quiz-page/QuizHeader";
import QuizQuestion from "../components/quiz-page/QuizQuestion";
import QuizOptions from "../components/quiz-page/QuizOptions";
import QuizNavigation from "../components/quiz-page/QuizNavigation";
import QuizProgress from "../components/quiz-page/QuizProgress";

const QUIZ_TIME = 10 * 60; // 10 menit
export default function QuizPage() {
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  const workspaceId = localStorage.getItem("workspaceId");

  const quizTitle = quiz?.title || "Quiz";
  const questions = quiz?.questions || [];

  const letters = ["A", "B", "C", "D"];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const question = questions[currentQuestion];
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await getQuizByWorkspace(workspaceId);

        setQuiz(response.data.quiz);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, []);

  useEffect(() => {
    if (loading) return;

    if (finished) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [loading, finished]);

  useEffect(() => {
    if (loading) return;

    if (finished) return;

    if (timeLeft === 0) {
      finishQuiz();
    }
  }, [timeLeft, loading, finished]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Quiz...
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center text-blue-700">
        <p>Tidak ada quiz. Kembali ke halaman utama atau buat quiz dulu.</p>
      </div>
    );
  }

  const next = () => {
    if (!answers[question.id]) {
      alert("Pilih jawaban dulu bro 😆");
      return;
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const finishQuiz = async () => {
    if (finished) return;

    if (!answers[question.id]) {
      alert("Pilih jawaban terakhir dulu bro 😆");
      return;
    }

    setFinished(true);

    let score = 0;

    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        score++;
      }
    });

    const result = {
      score,
      total: questions.length,
      percentage: Math.round((score / questions.length) * 100),
      answers,
      questions,
    };

    try {
      await createHistory({
        workspace_id: workspaceId,

        title: quizTitle,

        score,

        total_question: questions.length,

        percentage: result.percentage,
      });
    } catch (err) {
      console.error("Gagal menyimpan history:", err);
    }

    localStorage.setItem("quiz-result", JSON.stringify(result));

    navigate("/overview");
  };

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="min-h-screen bg-slate-50">
      <QuizHeader
        title={quizTitle}
        current={currentQuestion + 1}
        total={questions.length}
        timer={`${minutes}:${seconds}`}
      />

      <div className="mx-auto max-w-6xl px-12 py-12">
        <div className="mt-8">
          <QuizProgress current={currentQuestion} total={questions.length} />
        </div>
        <div className="mt-16">
          <QuizQuestion question={question.question} />
        </div>
      </div>

      <div className="mt-10 space-y-5">
        {question.options.map((option, index) => (
          <QuizOptions
            key={index}
            option={`${letters[index]}. ${option}`}
            selected={answers[question.id] === letters[index]}
            onClick={() =>
              setAnswers({
                ...answers,
                [question.id]: letters[index],
              })
            }
          />
        ))}
      </div>

      <div className="mt-14">
        <QuizNavigation
          current={currentQuestion}
          total={questions.length}
          onNext={next}
          onPrev={prev}
          onSubmit={finishQuiz}
        />
      </div>
    </div>
  );
}
