import { useState } from "react";

const Header = () => {
  const [dark, setDark] = useState(false);

  return (
    <div style={{
      textAlign: "center",
      padding: "20px",
      background: dark ? "#222" : "#f5f5f5",
      color: dark ? "white" : "black"
    }}>
      <h1>🗳️ Voting App</h1>
      <button onClick={() => setDark(!dark)}>
        Toggle {dark ? "Light" : "Dark"}
      </button>
    </div>
  );
};

export default Header;