// Context API for managing global voting state across the app
import { createContext, useContext, useEffect, useMemo, useState } from "react";

// Type definition for a voting item
export type Item = {
  id: number;
  name: string;
  votes: number;
};

// Type definition for context values
type VoteContextType = {
  items: Item[];
  vote: (id: number) => void;
  addItem: (name: string) => void;
  deleteItem: (id: number) => void; // ✅ added
  totalVotes: number;
  topId: number | null;
};

// Creating context
const VoteContext = createContext<VoteContextType | undefined>(undefined);

// Provider component
export const VoteProvider = ({ children }: { children: React.ReactNode }) => {
  
  // Load saved data from localStorage
  const [items, setItems] = useState<Item[]>(() => {
    const saved = localStorage.getItem("votes");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, name: "React", votes: 0 },
          { id: 2, name: "JavaScript", votes: 0 }
        ];
  });

  // Save data to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("votes", JSON.stringify(items));
  }, [items]);

  // Increase vote count
  const vote = (id: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, votes: item.votes + 1 } : item
      )
    );
  };

  // Add new item
  const addItem = (name: string) => {
    if (!name.trim()) return;

    setItems(prev => [
      ...prev,
      { id: Date.now(), name, votes: 0 }
    ]);
  };

  // Delete item
  const deleteItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  // Calculate total votes
  const totalVotes = useMemo(
    () => items.reduce((sum, item) => sum + item.votes, 0),
    [items]
  );

  // Find top voted item
  const topId = useMemo(() => {
    if (items.length === 0) return null;
    return [...items].sort((a, b) => b.votes - a.votes)[0].id;
  }, [items]);

  return (
    <VoteContext.Provider
      value={{ items, vote, addItem, deleteItem, totalVotes, topId }} // ✅ added deleteItem
    >
      {children}
    </VoteContext.Provider>
  );
};

// Custom hook to use context
export const useVote = () => {
  const ctx = useContext(VoteContext);
  if (!ctx) {
    throw new Error("useVote must be used within VoteProvider");
  }
  return ctx;
};