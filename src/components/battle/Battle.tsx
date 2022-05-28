import './Battle.css'

import { useState, useEffect, useRef } from 'react'

import { fixUrl } from '../../utils'
import BattleHamster from './BattleHamster'

interface Hamster {
  name: string,
  id: string,
  age: number,
  loves: string,
  favFood: string,
  imgName: string,
  games: number,
  wins: number,
  defeats: number
}

const Battle = () => {
  const [didVote, setDidVote] = useState(false)
  useEffect(() => {
    setDidVote(!didVote)
  }, [])

  const [hasVoted, setHasVoted] = useState<boolean>(false)
  const [matchDone, setMatchDone] = useState<boolean>(true)
  const [isWinner, setIsWinner] = useState<string>('')

  const [hamster, setHamster] = useState<null | Hamster>(null)
  const [hamster2, setHamster2] = useState<null | Hamster>(null)
  const dataRef = useRef(hamster)

  useEffect(() => { dataRef.current = hamster })
  useEffect(() => {
    async function getRandomHamster() {
      const response: Response = await fetch(fixUrl('/hamsters/random'))
      const apiData: any = await response.json()
      setHamster(apiData as Hamster)

      const response2: Response = await fetch(fixUrl('/hamsters/random'))
      const apihamster2: any = await response2.json()
      if (dataRef.current !== null && (apihamster2.id === dataRef.current.id)) {
        console.log('Duplicate!');
        getRandomHamster()

      } else if (dataRef.current === null) {
        console.log('dataRef is null.');

        getRandomHamster()
      } else {
        console.log('No duplicate');
        setHamster2(apihamster2 as Hamster)
      }
    }
    getRandomHamster()
  },[matchDone])

  const getNewMatch = () => {
    setMatchDone(!matchDone)
    setHasVoted(false)
  }

  let maybeButton = null
  if (hasVoted) {
    maybeButton = <button className='button-yes new-game-button' onClick={getNewMatch}>Start a new match</button>
  }


  useEffect(() => {
    if (hasVoted) {
      const sendWins = () => {
        if (hamster !== null && hamster2 !== null) {
          if (isWinner === hamster.id) {
            let newHamster = { ...hamster, wins: hamster.wins + 1, games: hamster.games + 1 }
            let newHamster2 = { ...hamster2, defeats: hamster2.defeats + 1, games: hamster2.games + 1 }

            const updateHamster = async (updatedHamster: Hamster) => {
              await fetch(fixUrl('/hamsters/' + updatedHamster.id), {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedHamster)
              })
            }
            updateHamster(newHamster)
            updateHamster(newHamster2)
            setHamster(newHamster)
            setHamster2(newHamster2)

            const addMatchResult = async () => {
              let matchObject = {winnerId: hamster.id, loserId: hamster2.id}

              await fetch(fixUrl('/matches'), {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(matchObject)
              })
            }
            addMatchResult()
          }
          if (isWinner === hamster2.id) {
            let newHamster = { ...hamster, defeats: hamster.defeats + 1, games: hamster.games + 1 }
            let newHamster2 = { ...hamster2, wins: hamster2.wins + 1, games: hamster2.games + 1 }

            const updateHamster = async (updatedHamster: Hamster) => {
              await fetch(fixUrl('/hamsters/' + updatedHamster.id), {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedHamster)
              })
            }
            updateHamster(newHamster)
            updateHamster(newHamster2)
            setHamster(newHamster)
            setHamster2(newHamster2)

            const addMatchResult = async () => {
              let matchObject = {winnerId: hamster2.id, loserId: hamster.id}

              await fetch(fixUrl('/matches'), {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(matchObject)
              })
            }
            addMatchResult()
          }
        }
      }
      sendWins()
    }
  },[hasVoted])

  let maybeWinner = null
  if (hasVoted) {
    if (hamster !== null && hamster2 !== null) {
      maybeWinner =
      <div className='winner-div'>
        <i className='fas fa-champagne-glasses'></i> {isWinner === hamster.id ? hamster.name : hamster2.name} is the winner, congrats! <i className='fas fa-champagne-glasses'></i>
      </div>
    }
  }

  return (
    <div className='battle'>
      <h1>Choose your winner!</h1>
      <p>(i.e. Which one is cuter?)</p>
      {maybeWinner}
      {maybeButton}
      <div className='battle-container'>
        {hamster !== null ? <BattleHamster hamster={hamster} setHasVoted={setHasVoted} hasVoted={hasVoted} setIsWinner={setIsWinner} /> : <div>No data yet.</div>}
        <img src={fixUrl('/assets/' + 'battle.svg')} alt='Battle symbol' className='battle-icon' />
        {hamster2 !== null ? <BattleHamster hamster={hamster2} setHasVoted={setHasVoted}  hasVoted={hasVoted}  setIsWinner={setIsWinner} /> : <div>No data yet.</div>}
      </div>
    </div>
  )
}

export default Battle
