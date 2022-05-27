import { useEffect, useState } from 'react'
import './App.css'
import { Navigate, Routes, Route } from 'react-router-dom'
import Start from './components/start/Start'
import Gallery from './components/gallery/Gallery'
import Statistics from './components/statistics/Statistics'
import History from './components/history/History'
import NotFound from './components/notfound/NotFound'
import DropDown from './components/dropdown/Dropdown'
import MyFooter from './components/footer/MyFooter'
import SingleHamster from './components/gallery/SingleHamster'
import Battle from './components/battle/Battle'
import { useRecoilState } from 'recoil'
import allHamstersAtom from './atoms/Hamsters'
import { Hamster } from './models/Hamster'
import { fixUrl } from './utils'

const App = () => {
  const [allHamstersData, setAllHamstersData] = useRecoilState<Hamster[]>(allHamstersAtom)

  useEffect(() => {
    async function getData() {
      const response: Response = await fetch(fixUrl('/hamsters'))
      const apiData: any = await response.json()
      setAllHamstersData(apiData as Hamster[])
    }
    getData()
  },[])

  return (
    <div className='app'>
      <header>
        <DropDown />
      </header>
      <main>
        <Routes>
          <Route path='/statistics' element={<Statistics />} />
          <Route path='/history' element={<History />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/gallery/:hamsterid' element={<SingleHamster />} />
          <Route path='/battle' element={<Battle />} />
          <Route path='/' element={<Start />} />
          <Route path='*' element={<Navigate to='/404' />
} />
          <Route path='/404' element={<NotFound />} />
        </Routes>
      </main>
      <footer>
        <MyFooter />
      </footer>
    </div>
  )
}

export default App
