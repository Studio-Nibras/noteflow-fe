import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getBattleSession, submitBattle } from "../services/battleApi";

import QuizHeader from "../components/quiz-page/QuizHeader";
import QuizQuestion from "../components/quiz-page/QuizQuestion";
import QuizOptions from "../components/quiz-page/QuizOptions";
import QuizNavigation from "../components/quiz-page/QuizNavigation";
import QuizProgress from "../components/quiz-page/QuizProgress";

const QUIZ_TIME = 10 * 60;

export default function BattleRoom() {
  const { sessionId } = useParams();

  const [session, setSession] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [waiting, setWaiting] = useState(false);
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME);

  const letters = ["A", "B", "C", "D"];

  const [submitted, setSubmitted] = useState(false);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;

    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!quiz || submitted) return;

    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, quiz, submitted]);

  useEffect(() => {
    const fetchBattle = async () => {
      try {
        const res = await getBattleSession(sessionId);

        setSession(res.session);

        // nanti kita isi
        setQuiz(res.quiz);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBattle();
  }, []);

  useEffect(() => {
    if (!waiting) return;

    const interval = setInterval(async () => {
      try {
        const res = await getBattleSession(session.id);

        if (res.session.status === "finished") {
          clearInterval(interval);

          navigate(`/quiz/battle/result/${session.id}`);
        }
      } catch (err) {
        console.error(err);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [waiting]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Battle...
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Quiz tidak ditemukan.
      </div>
    );
  }

  const questions = quiz.questions;

  const question = questions[currentQuestion];

  const next = () => {
    if (answers[currentQuestion] == null) return;

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;

    questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        score++;
      }
    });

    return score;
  };

  const handleSubmit = async () => {
    if (submitted) return;

    setSubmitted(true);

    try {
      const score = calculateScore();

      const res = await submitBattle(session.id, {
        score,
      });

      setSession(res.session);

      setWaiting(true);

    } catch (err) {
      console.error(err);
      setSubmitted(false);
    }
  };

  if (waiting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Waiting Opponent...</h1>

          <p className="mt-3 text-gray-500">
            Menunggu lawan menyelesaikan quiz.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <QuizHeader
        title={quiz.title}
        current={currentQuestion + 1}
        total={questions.length}
        timer={formatTime(timeLeft)}
      />

      <div className="mx-auto max-w-6xl px-12 py-12">
        <QuizProgress current={currentQuestion} total={questions.length} />

        <div className="mt-14">
          <QuizQuestion question={question.question} />
        </div>
      </div>

      <div className="mt-10 space-y-5">
        {question.options.map((option, index) => (
          <QuizOptions
            key={index}
            option={`${letters[index]}. ${option}`}
            selected={answers[currentQuestion] === letters[index]}
            onClick={() =>
              setAnswers({
                ...answers,
                [currentQuestion]: letters[index],
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
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
