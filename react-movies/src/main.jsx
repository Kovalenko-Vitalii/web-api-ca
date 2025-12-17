import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes, Link } from "react-router";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import WatchListPage from "./pages/watchListPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import PersonPage from "./pages/personPage.jsx";
import AuthContextProvider from "./contexts/authContext";
import ProtectedRoutes from "./protectedRoutes";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import ProfilePage from "./pages/profilePage";



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContextProvider>
          <SiteHeader />
          <MoviesContextProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/profile" element={<ProfilePage />} />


              {/* protected */}
              <Route element={<ProtectedRoutes />}>
                <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
                <Route path="/movies/watchlist" element={<WatchListPage />} />
              </Route>

              {/* public */}
              <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
              <Route path="/movies/top_rated" element={<TopRatedMoviesPage />} />
              <Route path="/reviews/:id" element={<MovieReviewPage />} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/reviews/form" element={<AddMovieReviewPage />} />
              <Route path="/person/:id" element={<PersonPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </MoviesContextProvider>
        </AuthContextProvider>
        </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};


const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);
