import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/Pages/Home/Home'
import Loginpage from './components/auth/Loginpage'
import Signup from './components/auth/Signup'
import Job from './components/Pages/Jobs/Job';
import Browse from './components/Pages/Browse/Browse';


const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home></Home>
  },
  {
    path:'/login',
    element : <Loginpage></Loginpage>
  },
  {
    path : '/signup',
    element:<Signup></Signup>
  },
  {
    path : '/jobs',
    element:<Job/>
  },
  {
    path : '/browse',
    element:<Browse/>
  }
]);


function App() {
  return (
    <>
      <RouterProvider router={appRouter}></RouterProvider>
    </>
  );
}

export default App
