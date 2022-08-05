// Import CSS file
import "./App.css";

// Import react router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Import pages
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Home } from "./pages/Home";
import { Registrations } from "./pages/Registrations";
import { RegisterFlight } from "./pages/RegisterFlight";

// Get registered user
let user = localStorage.getItem("travellerID");

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {user ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/all" element={<Registrations />} />
            <Route path="/register" element={<RegisterFlight />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/all" element={<Navigate replace to="/login" />} />
            <Route
              path="/register"
              element={<Navigate replace to="/login" />}
            />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
