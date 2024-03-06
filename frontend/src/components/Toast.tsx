import { useEffect } from "react";

// typing the toast properties
type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

// toast view
const Toast = ({ message, type, onClose }: ToastProps) => {
  // create timer
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  // create the style of toast from type
  const styles =
    type === "SUCCESS"
      ? "fixed top-4 right-4 z-50 py-3 px-6 rounded-md bg-green-600 border border-white text-white max-w-md transition-all ease-in-out duration-500"
      : "fixed top-4 right-4 z-50 py-3 px-6 rounded-md bg-red-600 border border-white text-white max-w-md transition-all ease-in-out duration-500";

  return (
    <div className={styles}>
      <div className="flex justify-center items-center ">
        <span className="text-sm font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
