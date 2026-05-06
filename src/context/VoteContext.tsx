// Context API for managing global voting state across the app
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Item = {
  id: number;
  name: string;
  votes: number;
};
// Type definition for a voting item
type VoteContextType = {
  items: Item[];
  vote: (id: number) => void;
  addItem: (name: string) => void;
  totalVotes: number;
  topId: number | null;
};
// Creating context for vote data
const VoteContext = createContext<VoteContextType | undefined>(undefined);
// Provider component to wrap the app and share state
export const VoteProvider = ({ children }: { children: React.ReactNode }) => {
  // Load saved votes from localStorage or use default data
  const [items, setItems] = useState<Item[]>(() => {
    const saved = localStorage.getItem("votes");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, name: "React", votes: 0 },
          { id: 2, name: "JavaScript", votes: 0 }
        ];
  });
// Save votes to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("votes", JSON.stringify(items));
  }, [items]);
// Function to increase vote count for a selected item
  const vote = (id: number) => {
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, votes: i.votes + 1 } : i))
    );
  };

  const addItem = (name: string) => {
    if (!name.trim()) return;
    setItems(prev => [
      ...prev,
      { id: Date.now(), name, votes: 0 }
    ]);
  };

  const totalVotes = useMemo(
    () => items.reduce((sum, i) => sum + i.votes, 0),
    [items]
  );

  const topId = useMemo(() => {
    if (items.length === 0) return null;
    return [...items].sort((a, b) => b.votes - a.votes)[0]?.id ?? null;
  }, [items]);

  return (
    <VoteContext.Provider value={{ items, vote, addItem, totalVotes, topId }}>
      {children}
    </VoteContext.Provider>
  );
};
// Custom hook to access vote context
export const useVote = () => {
  const ctx = useContext(VoteContext);
  if (!ctx) throw new Error("useVote must be used within VoteProvider");
  return ctx;
};