import Navbar from "./components/Navbar"
import Hero from "./sections/Hero"
import Sobre from "./sections/Sobre"
import Funcionalidades from "./sections/Funcionalidades"
import Arquitetura from "./sections/Arquitetura"
import Algoritmo from "./sections/Algoritmo"
import TechStack from "./sections/TechStack"
import Footer from "./sections/Footer"
import "./App.css"

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Sobre />
        <Funcionalidades />
        <Arquitetura />
        <Algoritmo />
        <TechStack />
      </main>
      <Footer />
    </>
  )
}
