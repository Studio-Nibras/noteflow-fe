import FAQItem from "../components/faq/FAQItem";

const faqs = [
  {
    question: "Apa itu NoteFlow?",
    answer:
      "NoteFlow adalah platform belajar berbasis AI yang membantu mengubah materi menjadi mindmap dan quiz secara otomatis.",
  },
  {
    question: "Bagaimana cara membuat materi?",
    answer:
      "Masuk ke Workspace kemudian buat materi baru atau upload materi yang ingin dipelajari.",
  },
  {
    question: "Bagaimana cara mendapatkan Learning Point?",
    answer:
      "Learning Point berasal dari akumulasi nilai (percentage) seluruh quiz yang telah kamu selesaikan.",
  },
  {
    question: "Apakah materi saya aman?",
    answer:
      "Ya. Semua materi tersimpan berdasarkan akun masing-masing pengguna sehingga tidak bercampur dengan akun lain.",
  },
];

export default function FAQ() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold">Pusat Bantuan</h1>

      <p className="mt-2 text-slate-500">
        Temukan jawaban atas pertanyaan yang sering ditanyakan.
      </p>

      <div className="mt-8 space-y-4">
        {faqs.map((faq) => (
          <FAQItem
            key={faq.question}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
    </div>
  );
}
