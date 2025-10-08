import React, { useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserBooks from "./pages/UserBooks";
import EditBook from "./pages/EditBook";
import ViewBook from "./pages/ViewBook";
import NewBook from "./pages/NewBook";
import Chat from "./pages/Chat";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavBar />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/auth", element: <Login /> },
        { path: "/new-user", element: <Signup /> },
        { path: "/:uid/books", element: <UserBooks /> },
        { path: "/edit-book/:bookId", element: <EditBook /> },
        { path: "/new-book", element: <NewBook /> },
        { path: "/book/:bookId", element: <ViewBook /> },
        { path: "/chat", element: <Chat /> },
      ],
    },
    ,
  ]);

  return (
    <main className="bg-gradient-to-b from-cyan-300 to-blue-500 min-h-screen">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
