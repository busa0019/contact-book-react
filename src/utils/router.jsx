import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Contact from '../routers/Contact.jsx';
import App from '../App.jsx';
import { EditForm } from '../routers/EditForm.jsx';
import { NewContact } from '../routers/NewContact.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/contact/:id",
        element: <Contact />
    },
    {
        path: "/contact/edit/:id",
        element: <EditForm />
    },
    {
        path: "/add-contact",
        element: <NewContact />
    }
]);

export default router;