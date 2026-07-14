import Button from "../ui/Button";

export default function BattleInvitationModal({
  open,
  battle,
  onAccept,
  onDecline,
}) {
  if (!open || !battle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[420px] rounded-3xl bg-white p-8 shadow-xl">
        <h2 className="text-2xl font-bold">🎮 Battle Invitation</h2>

        <p className="mt-5">
          <span className="font-semibold">{battle.host.full_name}</span>{" "}
          mengundangmu battle.
        </p>

        <div className="mt-6 rounded-xl bg-slate-100 p-4">
          <p className="text-sm text-slate-500">Quiz</p>

          <h3 className="font-semibold">{battle.quisis.title}</h3>
        </div>

        <div className="mt-8 flex gap-3">
          <Button className="flex-1" onClick={onAccept}>
            Accept
          </Button>

          <Button variant="outline" className="flex-1" onClick={onDecline}>
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
}
