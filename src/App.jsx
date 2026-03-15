import { useEffect } from 'react'
import Loader          from './components/Loader'
import ScrollProgress  from './components/ScrollProgress'
import Navbar          from './components/Navbar'
import Hero            from './components/Hero'
import About           from './components/About'
import Skills          from './components/Skills'
import Projects        from './components/Projects'
import CodingProfiles  from './components/CodingProfiles'
import Learning        from './components/Learning'
import NeuralNetwork   from './components/NeuralNetwork'
import Contact         from './components/Contact'
import Footer          from './components/Footer'

export default function App() {
  return (
    <>
      {/* Background blobs */}
      <div className="blob blob1" />
      <div className="blob blob2" />

      {/* Global overlays */}
      <Loader />
      <ScrollProgress />

      {/* Nav */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <CodingProfiles />
        <Learning />
        <NeuralNetwork />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
