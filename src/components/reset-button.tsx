export default function ResetButton() {
  async function resetDaysSinceBug() {
    await fetch(`${location.origin}/api/reset-days-since-bug`, {
      method: "POST",
    });
    location.reload();
  }

  return (
    <button
      class="bg-slate-700/70 rounded-md font-semibold hover:bg-slate-700/60 focus:ring-2 ring-purple-400 ring-offset-2 ring-offset-slate-900 outline-none px-4 py-2"
      onClick={resetDaysSinceBug}
    >
      A Bug Happened :(
    </button>
  );
}
