import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      theme="dark"
      toastOptions={{
        style: {
          background: "#0B0B0F",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "white",
        },
      }}
    />
  );
}

