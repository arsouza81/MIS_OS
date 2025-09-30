import { useEffect, useState } from "react";
import "./Toast.css";

export default function Toast({ message, type = "success", onClose, context = "" }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => handleClose(), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  if (!visible) return null;

  return (
    <div className={`toast ${type === "error" ? "error-toast" : "success-toast"} ${context ? `${context}-toast` : ""} show`}>
      <div className="toast-content">
        <span className="toast-message">
          {type === "error" ? "❌ " : "✅ "}
          {message}
        </span>
        <button onClick={handleClose} className="toast-close">&times;</button>
      </div>
    </div>
  );
}
