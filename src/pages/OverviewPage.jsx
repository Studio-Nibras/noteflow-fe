import OverviewHeader from "../components/overview/OverviewHeader";
import StatCard from "../components/overview/StatCard";
import QuestionReview from "../components/overview/QuestionReview";
import OverviewActions from "../components/overview/OverviewActions";
import AIInsightCard from "../components/overview/AIInsightCard";

import { Target, CheckCircle2, XCircle } from "lucide-react";

export default function OverviewPage() {
  const result = JSON.parse(localStorage.getItem("quiz-result") || "{}");

  const {
    score = 0,
    total = 0,
    percentage = 0,
    questions = [],
    answers = {},
  } = result;

  const badge =
    percentage >= 90
      ? {
          title: "Excellent 🏆",
          color: "bg-yellow-100 text-yellow-700 border-yellow-300",
        }
      : percentage >= 70
        ? {
            title: "Good 👍",
            color: "bg-green-100 text-green-700 border-green-300",
          }
        : percentage >= 50
          ? {
              title: "Keep Going 💪",
              color: "bg-blue-100 text-blue-700 border-blue-300",
            }
          : {
              title: "Need Practice 📚",
              color: "bg-red-100 text-red-700 border-red-300",
            };

  return (
    <div className="flex">
      <main className="flex-1 p-8">
        <OverviewHeader
          score={score}
          total={total}
          percentage={percentage}
          badge={badge}
        />

        <div className="grid grid-cols-3 gap-5 mt-8">
          <StatCard
            title="Accuracy"
            value={`${percentage}%`}
            icon={<Target size={30} />}
          />

          <StatCard
            title="Correct"
            value={score}
            icon={<CheckCircle2 size={30} />}
          />

          <StatCard
            title="Wrong"
            value={total - score}
            icon={<XCircle size={30} />}
          />
        </div>

        <div className="mt-8 space-y-8">
          {questions.map((question) => {
            const isCorrect = answers[question.id] === question.correctAnswer;

            return (
              <div
                key={question.id}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
              >
                <QuestionReview
                  question={question}
                  userAnswer={answers[question.id]}
                />

                <AIInsightCard correct={isCorrect} />
              </div>
            );
          })}
        </div>

        <OverviewActions />
      </main>
    </div>
  );
}
