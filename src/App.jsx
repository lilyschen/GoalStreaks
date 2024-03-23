import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from "./routes/LoginPage.jsx";
import ProfilePage, {loader as profileLoader} from "./routes/ProfilePage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
    },
    {
        path: ":userId/edit",
        element: <ProfilePage isEditable />,
        loader: profileLoader
    },
    {
        path: ":userId",
        element: <ProfilePage />,
        loader: profileLoader
    }
]);

export default function App() {

    return <div className={"App"}>
        <RouterProvider router={router} />
    </div>
}