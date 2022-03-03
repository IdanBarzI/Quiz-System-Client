import React, { Suspense } from "react";
import { Layout, LoadingSpinner, ProtectedRoute } from "./components/Ui";
import { Route, Routes } from "react-router-dom";

const Login = React.lazy(() => import("./pages/Login"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const StudentTest = React.lazy(() => import("./pages/StudentTest"));
const MainMenu = React.lazy(() => import("./pages/MainMenu"));
const Questions = React.lazy(() => import("./pages/Questions"));
const Tests = React.lazy(() => import("./pages/Tests"));
const TestForm = React.lazy(() => import("./pages/TestForm"));
const Reports = React.lazy(() => import("./pages/Reports"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route exac path="/student/test/:id" element={<StudentTest />} />

          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/admin/main-menu" element={<MainMenu />} />
            <Route path="/admin/questions" element={<Questions />} />
            <Route exac path="/admin/tests" element={<Tests />} />
            <Route path="/admin/tests/:testId" element={<TestForm />} />
            <Route path="/admin/reports" element={<Reports />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
