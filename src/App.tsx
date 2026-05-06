// Main application component
// Wraps all components inside VoteProvider for global state

import { VoteProvider } from "./context/VoteContext";
import VoteList from "./components/VoteList";
import Header from "./components/Header";
import AddItem from "./components/AddItem";

function App() {
  return (
    <VoteProvider>
      <Header />
      <AddItem />
      <VoteList />
    </VoteProvider>
  );
}

export default App;