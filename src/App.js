import { useEffect } from "react"
import Nav from "./components/navigation"
import { preloadImages } from "./utils/preloadImages"

const App = () => {
  useEffect(() => {
    preloadImages()
  }, [])

  return <Nav />
}

export default App
