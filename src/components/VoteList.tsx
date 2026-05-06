// Component to render list of all voting items
import { useVote } from "../context/VoteContext";
import VoteItem from "./VoteItem";

const VoteList = () => {
  const { items } = useVote();

  return (
    <>
    {/* Loop through items and display each one */}
      {items.map((item) => (
        <VoteItem key={item.id} item={item} />
      ))}
    </>
  );
};

export default VoteList;