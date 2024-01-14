import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import SignupPage from "./pages/SignupPage";

const App = () => {
  const { isLoading: isUserLoading } = useContext(AuthContext);

  if (isUserLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
      </Routes>
    </div>
  );
};

export default App;
