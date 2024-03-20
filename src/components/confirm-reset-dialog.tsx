import { AlertDialog, TextField, Button } from "@kobalte/core";
import { HiSolidArrowPath, HiSolidXMark } from "solid-icons/hi";
import { createSignal, type Ref } from "solid-js";

export default function ConfirmResetDialog() {
  let dateInputRef: HTMLInputElement | undefined;

  return (
    <AlertDialog.Root>
      <AlertDialog.Portal>
        <div class="absolute inset-0 flex items-center justify-center max-w-lg mx-auto px-4">
          <AlertDialog.Content
            class="bg-slate-800/40 border border-slate-700/40 rounded-lg p-6 backdrop-blur-xl shadow-xl"
            onOpenAutoFocus={(e) => {
              e.preventDefault();
              dateInputRef?.focus();
            }}
          >
            <div class="flex items-start gap-4 justify-between">
              <AlertDialog.Title class="text-lg pb-8">
                Are you sure you want to reset the counter?
              </AlertDialog.Title>
              <AlertDialog.CloseButton class="rounded-md font-semibold focus:ring-2 ring-purple-400 outline-none p-2">
                <HiSolidXMark stroke-width={1} />
              </AlertDialog.CloseButton>
            </div>
            <AlertDialog.Description class="text-sm text-slate-400 pb-16">
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
      <AlertDialog.Trigger class="bg-slate-700/70 rounded-md font-semibold hover:bg-slate-700/60 focus:ring-2 ring-purple-400 ring-offset-2 ring-offset-slate-900 outline-none px-4 py-2">
        A Bug Happened :(
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
          class="bg-slate-900/70 border border-slate-700/70 rounded-md focus:ring-2 ring-purple-400 ring-offset-2 ring-offset-slate-900 outline-none px-4 py-2 placeholder:text-slate-600 w-full"
          placeholder={today}
          maxLength={today.length}
          autocomplete="off"
        />
      </TextField.Root>
      <Button.Root
        class="text-white bg-purple-600 rounded-md font-semibold hover:bg-purple-700 focus:ring-2 ring-purple-400 ring-offset-2 ring-offset-slate-900 outline-none px-4 py-2 flex items-center gap-2 group kb-invalid:bg-slate-700 kb-invalid:text-slate-400 kb-invalid:cursor-not-allowed"
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
