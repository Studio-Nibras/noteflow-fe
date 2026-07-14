import { CheckCircle2, XCircle } from "lucide-react";

export default function QuestionReview({ question, userAnswer }) {
  const letters = ["A", "B", "C", "D"];

  const correctIndex = letters.indexOf(question.correctAnswer);
  const userIndex = letters.indexOf(userAnswer);

  const correctText =
    correctIndex !== -1 ? question.options[correctIndex] : "-";

  const userText =
    userIndex !== -1 ? question.options[userIndex] : "Tidak dijawab";

  const isCorrect = userAnswer === question.correctAnswer;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start gap-3">
        {isCorrect ? (
          <CheckCircle2 className="mt-1 text-green-600" size={22} />
        ) : (
          <XCircle className="mt-1 text-red-600" size={22} />
        )}

        <div>
          <h3 className="font-semibold text-slate-800">{question.question}</h3>

          <p
            className={`mt-1 text-sm ${
              isCorrect ? "text-green-600" : "text-red-600"
            }`}
          >
            {isCorrect ? "Jawaban Benar" : "Jawaban Salah"}
          </p>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <p>
          <span className="font-medium">Jawaban Kamu :</span>{" "}
          <span className={isCorrect ? "text-green-600" : "text-red-600"}>
            {userAnswer ? `${userAnswer}. ${userText}` : "Tidak dijawab"}
          </span>
        </p>

        <p>
          <span className="font-medium">Jawaban Benar :</span>{" "}
          <span className="text-green-600">
            {question.correctAnswer}. {correctText}
          </span>
        </p>
      </div>
    </div>
  );
}
