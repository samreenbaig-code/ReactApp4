// Component to display a single voting item
import { useVote } from "../context/VoteContext";

const VoteItem = ({ item }: { item: any }) => {
  const { vote, deleteItem, totalVotes, topId } = useVote();

  const percent = totalVotes
    ? Math.round((item.votes / totalVotes) * 100)
    : 0;

  const isTop = item.id === topId;

  return (
  <div style={{
    border: isTop ? "2px solid gold" : "1px solid #ddd",
    padding: "20px",
    margin: "15px auto",
    borderRadius: "12px",
    maxWidth: "500px",
    background: "#fff",
    textAlign: "center"
  }}>
    {/* Display item name */}
    <h2>
      {item.name} {isTop && "🏆"}
    </h2>

    {/* Display vote count */}
    <p>Votes: {item.votes} ({percent}%)</p>

    {/* Progress bar */}
    <div style={{
      height: "10px",
      background: "#eee",
      borderRadius: "5px",
      overflow: "hidden",
      marginBottom: "15px"
    }}>
      <div style={{
        width: `${percent}%`,
        background: isTop ? "gold" : "#007bff",
        height: "100%"
      }} />
    </div>

    {/* Buttons */}
    <div>
      <button onClick={() => vote(item.id)}>
        Vote 👍
      </button>

      <button
        onClick={() => deleteItem(item.id)}
        style={{
          marginLeft: "10px",
          padding: "8px 15px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Delete ❌
      </button>
    </div>
  </div>
);
};

export default VoteItem;