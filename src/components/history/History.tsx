import './History.css'

import { useEffect, useState } from 'react'
import { fixUrl } from '../../utils'
import { Match } from '../../models/Match'
import MatchObject from './MatchObject'
import { Hamster } from '../../models/Hamster'

const About = () => {
  const [matchesData, setMatchesData] = useState<Match[] | null | undefined>(null)
  const [hamstersData, setHamstersData] = useState<Hamster[] | null>(null)

  useEffect(() => {
    async function getData() {
      const response: Response = await fetch(fixUrl('/matches'))
      const apiMatchData: any = await response.json()
      setMatchesData(apiMatchData as Match[])
    }
    getData()
  }, [])

  useEffect(() => {
    async function getData() {
      const response: Response = await fetch(fixUrl('/hamsters'))
      const apiData: any = await response.json()
      setHamstersData(apiData as Hamster[])
    }
    getData()
  },[])

  let removeContent = (id: string) => {
    let filteredMatches: Match[] | undefined = matchesData?.filter(match =>
      match.id !== id
    )

    setMatchesData(filteredMatches);
  }

  return (
    <section className='history'>
      <h2>Battle history</h2>
      <p className='history-desc'>Below are the results of every battle ever fought in the Hamster Wars.</p>
      <p className='history-desc'>Click the 'X' in the top corner of a battle, and then yes, to remove it from the database.</p>
      <div className='matches'>
        {matchesData && matchesData.length >= 1 ? matchesData.map(({winnerId, loserId, id}) => (
          <MatchObject key={id} id={id} winnerId={winnerId} loserId={loserId} hamstersData={hamstersData} removeItem={removeContent} />
          )) :
          <div className='no-matches'>
            <p>Could not find any matches.</p>
          </div>
        }
      </div>
    </section>
  )
}

export default About
