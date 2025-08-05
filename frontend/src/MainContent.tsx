import styles from "./MainContent.module.css";
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';

function MainContent() {
  return (
    <main className={`col-12 col-md-9 col-lg-10 ${styles.mainContent}`}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </main>
  );
};

export default MainContent;
