import './App.css';
import { RouterProvider } from 'react-router-dom';
import { ScrollLockWatcher } from './features/scroll/ScrollLockWatcher';
import { router } from './routes/routes';

function App() {
  return (
    <>
      <ScrollLockWatcher />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
