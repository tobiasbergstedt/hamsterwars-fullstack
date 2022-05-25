import { Fruit } from '../../models/Fruit'
import { useState } from 'react'
import { fixUrl } from '../../utils'
import { application } from 'express'

const About = () => {
  const [maybeData, setMaybeData] = useState<Fruit[] | null>(null)

  const getData: (() => Promise<void>) = async () => {
		const response = await fetch(fixUrl('/fruits'))
		const data = await response.json()
		// om response.json misslyckas: kontrollera din URL, kontrollera om du får en HTML-sida
		setMaybeData(data)
	}

  return (
    <section className='about'>
      <h1>History</h1>
      <div className='add-fruits'>
        <button onClick={getData}> Get data from API </button>
        <section> {maybeData ? (
          maybeData.map(fruit => (<p key={fruit.name}> {fruit.name} .. {fruit.price}€ </p>))
        ) : 'No data yet...'} </section>
      </div>
    </section>
  )
}

export default About
