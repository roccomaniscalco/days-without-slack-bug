import confetti from "canvas-confetti";
import { onMount } from "solid-js";

export default function Confetti() {
  onMount(() =>
    confetti({
      spread: 360,
      startVelocity: 30,
    }),
  );
  return null;
}
