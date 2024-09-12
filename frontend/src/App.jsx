import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/Pages/Home/Home'
import Loginpage from './components/auth/Loginpage'
import Signup from './components/auth/Signup'


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
