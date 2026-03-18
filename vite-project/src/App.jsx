import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './components/RootLayout'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import UserProfile from './components/UserProfile'
import AuthorProfile from './components/AuthorProfile'
import ArticleByID from './components/ArticleByID'
import AuthorArticle from './components/AuthorArticle'
import WriteArticle from './components/WriteArticle'

function App() {
  const routerObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/user-profile", element: <UserProfile /> },
        {
          path: "/author-profile",
          element: <AuthorProfile />, 
          children: [
            { path: "articles", element: <AuthorArticle /> },
            { path: "write-article", element: <WriteArticle /> }
          ]
        },
        { path: "/article/:articleId", element: <ArticleByID /> }
      ]
    }
  ])

  return <RouterProvider router={routerObj} />
}

export default App