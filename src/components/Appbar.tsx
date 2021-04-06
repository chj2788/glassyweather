import { FC } from "react";

const Appbar: FC = () => {
  return (
    <div style={{ backgroundColor: "black", padding: "1em 0" }}>
      <h1
        style={{
          fontWeight: 500,
          color: "white",
          letterSpacing: "5px",
          cursor: "pointer",
        }}
      >
        <span>Glassy</span>
        <span>Weather</span>
      </h1>
    </div>
  );
};

export default Appbar;
