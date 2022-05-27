import './Statistics.css'

import { useEffect, useState } from 'react'
import { fixUrl } from '../../utils'
import { Hamster } from '../../models/Hamster'
import { Link } from 'react-router-dom'

const About = () => {
  const [winnersData, setWinnersData] = useState<Hamster[] | null>(null)
  const [losersData, setLosersData] = useState<Hamster[] | null>(null)

  useEffect(() => {
    async function getData() {
      const winnersResponse: Response = await fetch(fixUrl('/winners'))
      const winnersData: any = await winnersResponse.json()
      setWinnersData(winnersData as Hamster[])

      const losersResponse: Response = await fetch(fixUrl('/losers'))
      const losersData: any = await losersResponse.json()
      setLosersData(losersData as Hamster[])
    }
    getData()
  }, [])

  return (
    <section className='statistics'>
      <div className='winners'>
        <h2>Winners</h2>
        <p>These are the 5 cutest hamsters of them all, ranked (highest number of wins). Congrats to being so gosh darn cute!</p>
        {winnersData && winnersData.length >= 1 ? winnersData.map(({name, imgName, id, wins, games}, index) => (
          // <div className='winners-object' key={id}>
          <Link to={'/gallery/' + id} className='winners-object' key={id}>
            <div className='img-container'>
              <img src={fixUrl('/img/' + imgName)} alt={'Image of ' + name} />
            </div>
            <div className='statistics-container'>
              <p>{index + 1}. {name}</p>
              <p>Wins: {wins} (of {games} games)</p>
            </div>
          </Link>
          )) :
          <div className='no-winners'>
            <p>Could not find any hamsters.</p>
          </div>
        }
      </div>
      <div className='losers'>
        <h2>Losers</h2>
        <p>These are the 5 least cutest hamsters of them all, ranked (highest number of losses). Better luck next time!</p>
        {losersData && losersData.length >= 1 ? losersData.map(({name, imgName, id, defeats, games}, index) => (
        <Link to={'/gallery/' + id} className='losers-object' key={id}>
          <div className='img-container'>
            <img src={fixUrl('/img/' + imgName)} alt={'Image of ' + name} />
          </div>
          <div className='statistics-container'>
            <p>{index + 1}. {name}</p>
            <p>Losses: {defeats} (of {games} games)</p>
          </div>
        </Link>
        )) :
          <div className='no-losers'>
            <p>Could not find any hamsters.</p>
          </div>
        }
      </div>
    </section>
  )
}

export default About
