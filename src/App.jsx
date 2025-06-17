import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";

import WelcomePage from "./pages/WelcomePage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<WelcomePage/>}/>
      </Routes>
      
    </>
  );
}

export default App;
