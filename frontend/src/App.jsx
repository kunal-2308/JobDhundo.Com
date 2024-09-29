import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/Pages/Home/Home'
import Loginpage from './components/auth/Loginpage'
import Signup from './components/auth/Signup'
import Job from './components/Pages/Jobs/Job';
import Browse from './components/Pages/Browse/Browse';
import Profile from './components/Pages/Profile/Profile';
import JobDescription from './components/Pages/Jobs/JobDescription';


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
    path : '/jobs/description/:id',
    element:<JobDescription/>
  },
  {
    path : '/browse',
    element:<Browse/>
  },
  {
    path:'/profile',
    element : <Profile/>
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
