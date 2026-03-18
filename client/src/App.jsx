import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import MovieDetail from './components/MovieDetail';
import Watchlist from './components/Watchlist';
import './App.css';

// Doesn't include MovieDetail because this is a navigation bar
const NavigationBar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-title">Movie App</Link>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/watchlist">Watchlist</Link>
      </div>
    </nav>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;