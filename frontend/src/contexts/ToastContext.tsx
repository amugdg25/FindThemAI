import { createContext, useContext, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "warning";
}

interface ToastContextType {
  showToast: (message: string, type: "success" | "error" | "warning") => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (
    message: string,
    type: "success" | "error" | "warning"
  ) => {
    const newToast = { id: Date.now(), message, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== newToast.id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-full max-w-sm z-50 flex flex-col gap-2 items-center">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`px-3 py-2 rounded-lg shadow-lg text-white text-center font-semibold w-full ${
              toast.type === "success"
                ? "bg-green-400"
                : toast.type === "error"
                ? "bg-red-400"
                : "bg-yellow-400"
            }`}
          >
            {toast.type === "success"
              ? "✅"
              : toast.type === "error"
              ? "🚫"
              : "⚠️"}
            {" " + toast.message}
          </motion.div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
