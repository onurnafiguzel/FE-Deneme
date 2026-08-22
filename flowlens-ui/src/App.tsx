import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EndpointsPage } from "./pages/EndpointsPage";
import {EndpointDetailPage} from "./pages/EndpointDetailPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EndpointsPage />} />
        <Route path="/endpoints/:id" element={<EndpointDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
