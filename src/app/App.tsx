import { RouterProvider } from 'react-router-dom';
import { router } from './providers/Router';

import './styles/index.scss';

const App = () => {
    return (
        <RouterProvider router={router} />
    );
};

export default App;
