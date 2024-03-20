import { AlertDialog, TextField, Button } from "@kobalte/core";
import { HiSolidArrowPath, HiSolidXMark } from "solid-icons/hi";
import { createSignal, type Ref } from "solid-js";

export default function ConfirmResetDialog() {
  let dateInputRef: HTMLInputElement | undefined;

  return (
    <AlertDialog.Root>
      <AlertDialog.Portal>
        <div class="absolute inset-0 mx-auto flex max-w-lg items-center justify-center px-4">
          <AlertDialog.Content
            class="animate-slide-up rounded-lg border border-slate-700/40 bg-slate-800/40 p-6 shadow-xl backdrop-blur-xl"
            onOpenAutoFocus={(e) => {
              e.preventDefault();
              dateInputRef?.focus();
            }}
          >
            <div class="flex items-start justify-between gap-4">
              <AlertDialog.Title class="pb-8 text-lg">
                Are you sure you want to reset the counter?
              </AlertDialog.Title>
              <AlertDialog.CloseButton class="rounded-md p-2 font-semibold outline-none ring-purple-400 focus:ring-2">
                <HiSolidXMark stroke-width={1} />
              </AlertDialog.CloseButton>
            </div>
            <AlertDialog.Description class="pb-16 text-sm text-slate-400">
              Enter today's date below to confirm that a slack bug has occurred
              in{" "}
              <span class="font-mono text-slate-300">
                #squad-special-forces
              </span>
              .
            </AlertDialog.Description>
            <ResetForm ref={dateInputRef!} />
          </AlertDialog.Content>
        </div>
      </AlertDialog.Portal>
      <AlertDialog.Trigger class="flex items-center gap-2 rounded-md bg-purple-600 px-4 py-2 font-semibold text-white outline-none ring-purple-400 ring-offset-2 ring-offset-slate-900 hover:bg-purple-700 focus:ring-2">
        Reset Counter
        <HiSolidArrowPath stroke-width={1} />
      </AlertDialog.Trigger>
    </AlertDialog.Root>
  );
}

type ResetFormProps = {
  ref: Ref<HTMLInputElement>;
};
function ResetForm(props: ResetFormProps) {
  const [dateValue, setDateValue] = createSignal("");
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const today = new Date().toLocaleString("en-us", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  });
  const isDateValid = () => dateValue() === today;

  const resetCounter = async () => {
    if (!isDateValid()) return;
    setIsSubmitting(true);
    await fetch(`${location.origin}/api/reset-days-since-bug`, {
      method: "POST",
    });
    location.reload();
  };

  return (
    <form
      class="flex w-full gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        resetCounter();
      }}
    >
      <TextField.Root
        class="flex-1"
        value={dateValue()}
        onChange={setDateValue}
        disabled={isSubmitting()}
      >
        <TextField.Input
          ref={props.ref}
          class="w-full rounded-md border border-slate-700/70 bg-slate-900/70 px-4 py-2 outline-none ring-purple-400 ring-offset-2 ring-offset-slate-900 placeholder:text-slate-600 focus:ring-2"
          placeholder={today}
          maxLength={today.length}
          autocomplete="off"
        />
      </TextField.Root>
      <Button.Root
        class="group flex items-center gap-2 rounded-md bg-purple-600 px-4 py-2 font-semibold text-white outline-none ring-purple-400 ring-offset-2 ring-offset-slate-900 hover:bg-purple-700 focus:ring-2 kb-invalid:cursor-not-allowed kb-invalid:bg-slate-700 kb-invalid:text-slate-400"
        type="submit"
        disabled={isSubmitting() || !isDateValid()}
        data-invalid={!isDateValid() ? "true" : undefined}
      >
        Reset Counter
        <HiSolidArrowPath
          stroke-width={1}
          class={isSubmitting() ? "animate-spin" : "animate-none"}
        />
      </Button.Root>
    </form>
  );
}
