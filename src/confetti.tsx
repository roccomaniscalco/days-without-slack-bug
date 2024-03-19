import confetti from "canvas-confetti";
import { onMount } from "solid-js";

export default function Confetti() {
  onMount(() =>
    confetti({
      origin: {
        y: 0.5,
        x: 0.5,
      },
      spread: 360,
      startVelocity: 30,
    })
  );
  return null;
}
