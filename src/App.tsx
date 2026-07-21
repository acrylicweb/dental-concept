import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Treatments from "./pages/Treatments";
import Invisalign from "./pages/Invisalign";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/treatments" element={<Treatments />} />
      <Route path="/treatments/invisalign" element={<Invisalign />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
