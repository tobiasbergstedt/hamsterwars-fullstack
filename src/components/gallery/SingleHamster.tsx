import './SingleHamster.css'

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Hamster } from '../../models/Hamster'
import { Match } from '../../models/Match'
import { fixUrl } from '../../utils'

import { useRecoilValue } from 'recoil'
import hamsterAtom from '../../atoms/Hamsters'

const SingleHamster = () => {
  const params = useParams()

  const allHamstersData = useRecoilValue(hamsterAtom)

  const [hamsterData, setHamsterData] = useState<Hamster | null>(null)
  const [matchData, setMatchData] = useState<Match[] | null>(null)

  useEffect(() => {
    async function getData() {
      const response: Response = await fetch('http://tobias-hamsterwars.herokuapp.com/hamsters/' + params.hamsterid)
      const apiData: any = await response.json()
      setHamsterData(apiData as Hamster)

      const matchwinnerResponse: Response = await fetch('http://tobias-hamsterwars.herokuapp.com/matchWinners/' + params.hamsterid)
      const apiMatchData: any = await matchwinnerResponse.json()
      setMatchData(apiMatchData as Match[])
    }
    getData()
  },[])

  let winWidth: number = 0
  let loseWidth: number = 0
  let winsDifference: number = 0
  if (hamsterData !== null) {
    winWidth = (Math.round((hamsterData.wins/hamsterData.games)*100))
    loseWidth = (Math.round((hamsterData.defeats/hamsterData.games)*100))
    winsDifference = hamsterData.wins - hamsterData.defeats
  }

  let searchArray = [...allHamstersData]

  return (
    <div className='single-hamster'>
      <Link to={'/gallery'} className='arrow-back'>
          <i className='fas fa-arrow-left'></i>
          <p>Go back to gallery</p>
      </Link>
      {hamsterData !== null ?
        <div className='hamster'>
          <div className='hamster-info'>
            <h2>{hamsterData.name}, <span className='hamster-age'>age {hamsterData.age}</span></h2>
            <p>Win difference: {winsDifference} ({winWidth}% wins)</p>
            <img className='hamster-pic' src={fixUrl('/img/' + hamsterData.imgName)} alt='The cutest hamster of them all! (Best win ratio)' />
            <div className='hamster-details'>
                <p>Loves: {hamsterData.loves}</p>
                <p>Favorite food: {hamsterData.favFood}</p>
                <p>Battles fought: {hamsterData.games}</p>
                <div className='statistics-div'>
                  <p className='wins'>Wins: {hamsterData.wins}</p>
                  <p className='losses'>Losses: {hamsterData.defeats}</p>
                </div>
                <div className='graph-div'>
                  <div className='graph1' style={loseWidth > 0 ? {width: winWidth - 0.5 + '%'} : {width: winWidth + '%'}} />
                  <div className='graph-divider' style={loseWidth > 1 ? {width: '1%'} : {width: '0%'}} />
                  <div className='graph2' style={winWidth > 0 ? {width: loseWidth - 0.5 + '%'} : {width: loseWidth + '%'}} />
                </div>
            </div>
          </div>
          <div className='match-info'>
          <h3>{hamsterData.name}'s wins:</h3>
      {matchData ? matchData.map((match: Match, index) => (
          <div key={match.id} className='single-match'>
            <p>Match number: {index + 1}</p>
            <p>Winner: {searchArray.filter((p) => p.id === match.winnerId) ? searchArray.filter((p) => p.id === match.winnerId)[0].name : match.winnerId}</p>
            <p>Loser: {searchArray.filter((p) => p.id === match.loserId) ? searchArray.filter((p) => p.id === match.loserId)[0].name : match.loserId}</p>
          </div>
        )) : <div className='single-match'>
        <p>No matches won.</p>
        </div>}
          </div>
        </div>
      : <div>No hamsterdata found (yet).</div>}
    </div>
  )
}

export default SingleHamster
