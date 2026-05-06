// Component to add a new voting item
import { useState } from "react";
import { useVote } from "../context/VoteContext";

const AddItem = () => {
  const [name, setName] = useState("");
  const { addItem } = useVote();

  const handleAdd = () => {
    addItem(name);
    setName("");
  };

  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Add new item..."
        style={{
          padding: "10px",
          width: "200px",
          marginRight: "10px"
        }}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default AddItem;