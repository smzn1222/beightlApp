import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./ComponentHome/Home";
import Chat from "./ComponentChat/Chat";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          {/*not foundの時Homeへリダイレクト*/}
          <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
