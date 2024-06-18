import './App.css'
import Header from './Components/Header/Header'
import MovieList from './Components/MovieListFolder/MovieList'
import Footer from './Components/Footer/Footer'


const App = () => {

  return (
    <div className="App">
      <Header />
      <MovieList />
      <Footer />
    </div>
  )
}

export default App
