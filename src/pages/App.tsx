/* VENDOR */
import { Route, Routes, Navigate } from "react-router-dom";
import { lazy } from "react";
import { Suspense } from "react";

/* APPLICATION */
import "./App.css";
import { Header } from "../shared/UI/Header/Header";
const Tasks = lazy(() => import("../modules/tasks/components/Tasks"));

const Categories = lazy(
  () => import("../modules/categories/components/Categories"),
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route
          path="/tasks"
          element={
            <Suspense fallback={<h2>Loading...</h2>}>
              <Tasks />
            </Suspense>
          }
        />
        <Route
          path="/categories"
          element={
            <Suspense fallback={<h2>Loading...</h2>}>
              <Categories />
            </Suspense>
          }
        />
        <Route index element={<Navigate to="/tasks" />} />
      </Route>
    </Routes>
  );
}

export default App;
