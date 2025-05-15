import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Feedback from "./pages/Feedback";
import History from "./pages/History";
import ProtectedRoute from "./ProtectedRoute";
import PageNotFound from "./pages/PageNotFound"; // Import your 404 page

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Protect these routes */}
        <Route
          path="/feedback"
          element={
            <ProtectedRoute>
              <Feedback />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        {/* Catch all unmatched routes */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}
