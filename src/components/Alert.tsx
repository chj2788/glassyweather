import React, { FC } from "react";

interface AlertProps {
  message: string;
  onClose: () => void;
}

const Alert: FC<AlertProps> = ({ message, onClose }) => {
  return (
    <div>
      <div className="modal-background" onClick={onClose}>
        <div className="modal-card">
          <header>
            <p>{message}</p>
          </header>
          <footer>
            <button onClick={onClose}>Close</button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Alert;
