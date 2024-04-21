import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Protected from "./components/ProtectedRoutes";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import DetailedBlog from "./components/DetailedBlog";
import MyBlogsPage from "./pages/MyBlogsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <Protected>
        {" "}
        <HomePage />
      </Protected>
    ),
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/blog-details",
    element: (
      <Protected>
        {" "}
        <DetailedBlog />
      </Protected>
    ),
  },
  {
    path: "/my-blogs",
    element: (
      <Protected>
        {" "}
        <MyBlogsPage />
      </Protected>
    ),
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
