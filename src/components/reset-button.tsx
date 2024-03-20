export default function ResetButton() {
  async function resetDaysSinceBug() {
    await fetch(`${location.origin}/api/reset-days-since-bug`, {
      method: "POST",
    });
    location.reload();
  }

  return (
    <button
      class="bg-slate-700/70 rounded-md font-semibold hover:bg-slate-700/60 active:bg-slate-700/50 focus:ring-2 ring-purple-400 ring-offset-2 ring-offset-slate-900 outline-none px-3 py-1"
      onClick={resetDaysSinceBug}
    >
      Reset
    </button>
  );
}
