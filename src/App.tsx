import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "@/pages/Landing";
import { Terms } from "@/pages/Terms";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
