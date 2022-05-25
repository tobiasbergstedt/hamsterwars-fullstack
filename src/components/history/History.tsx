import { Fruit } from '../../models/Fruit'
import { useState } from 'react'
import { fixUrl } from '../../utils'
import { application } from 'express'

const About = () => {
  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<string>('')

  const fruit: Fruit = {
    name: name,
    price: Number(price)
  }

  // fungerar som Computed properties
  const nameIsValid = fruit.name !== ''
  const priceIsValid = fruit.price && (fruit.price >= 0)
  const formIsValid = nameIsValid && priceIsValid  // lägg in validering här
  // Detta 'måste' kompletteras med användarvänliga felmeddelanden

  const handleAddFruit = () => {
    fetch(fixUrl('/fruits'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fruit)
    })
  }

  return (
    <section className='about'>
      <h1>History</h1>
      <div className='add-fruits'>
        <h3>Enter the fruit information</h3>
        <input type='text' placeholder='Fruit name' onChange={event => setName(event.target.value)} value={name}/>
        <input type='text' placeholder='Price' onChange={event => setPrice(event.target.value)} value={price} />
        <button disabled={!formIsValid} onClick={handleAddFruit}>Ok, add fruit now</button>
      </div>
    </section>
  )
}

export default About
