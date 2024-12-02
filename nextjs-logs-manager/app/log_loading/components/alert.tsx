import { Toast } from "flowbite-react";
import { useState } from "react";
import { HiFire } from "react-icons/hi";

const Alert = () => {
  const [showToast, setShowToast] = useState(false);

  if (!showToast) {
    return null;
  }

  return (
    <Toast>
      <div className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
        <HiFire className="size-5" />
      </div>
      <div className="ml-3 text-sm font-normal">Set yourself free.</div>
      <Toast.Toggle onDismiss={() => setShowToast(false)} />
    </Toast>
  );
};
