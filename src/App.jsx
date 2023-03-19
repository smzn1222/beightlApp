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
          <Route path="/Home" element={<Home />} />
          <Route path="/Chat" element={<Chat />} />
          {/*not foundの時Homeへリダイレクト*/}
          <Route path="/*" element={<Navigate to="/Home" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
