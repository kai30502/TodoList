import styles from "./MainContent.module.css";
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import AllTasks from "./pages/AllTasks";
import CompletedTasks from "./pages/CompletedTasks";
import IncompleteTasks from "./pages/IncompleteTasks";
import TodayTasks from "./pages/TodayTasks";

function MainContent() {
  return (
    <main className={`${styles.mainContent} col-lg-10`}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AllTasks" element={<AllTasks />} />
        <Route path="/CompletedTasks" element={<CompletedTasks />} />
        <Route path="/IncompleteTasks" element={<IncompleteTasks />} />
        <Route path="/TodayTasks" element={<TodayTasks />} />
      </Routes>
    </main>
  );
};

export default MainContent;
