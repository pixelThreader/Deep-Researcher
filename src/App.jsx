import { AIInput } from "./components/widgets";
import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./pages/Chat";
import {AllModels, LLMDetail, ManageModels, Settings} from "./pages/settings";

// Main App component
const App = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<AIInput />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/chat" element={<Navigate to="/" replace />} />
        <Route path="/settings" element={<Settings />}>
          <Route path="models" element={<AllModels />}>
            <Route path="manage" element={<ManageModels />} />
            <Route path=":model_name" element={<LLMDetail />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
};

export default App;
