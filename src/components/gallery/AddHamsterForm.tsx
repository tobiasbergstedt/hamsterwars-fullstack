import { LegacyRef, ReactElement, useEffect, useState } from 'react'
import { AddNewHamster } from '../../models/AddNewHamster'
import { fixUrl } from '../../utils'

interface Props {
  addHamsterRef: null | LegacyRef<HTMLDivElement>,
  addItem: (newHamster: AddNewHamster) => void
}

const AddHamsterForm = (props: Props) => {
  const [didMount, setDidMount] = useState(false)

  const [name, setName] = useState<string>('')
  const [age, setAge] = useState<string>('')
  const [loves, setLoves] = useState<string>('')
  const [favFood, setFavFood] = useState<string>('')
  const [imgNumber, setImgNumber] = useState<string>('')

  const [maybeName, setMaybeName] = useState<ReactElement| null>(null)
  const [maybeAge, setMaybeAge] = useState<ReactElement| null>(null)
  const [maybeLoves, setMaybeLoves] = useState<ReactElement| null>(null)
  const [maybeFavFood, setMaybeFavFood] = useState<ReactElement| null>(null)
  const [maybeImgName, setMaybeImgName] = useState<ReactElement| null>(null)

  const addNewHamster: AddNewHamster = {
    name: name,
    age: Number(age),
    loves: loves,
    favFood: favFood,
    imgName: 'hamster-' + imgNumber +'.jpg',
    games: 0,
    wins: 0,
    defeats: 0
  }

  const nameIsValid: boolean = addNewHamster.name !== '' && addNewHamster.name.length >= 2
  const ageIsValid = age !== '' && (Number(addNewHamster.age) >= 0) && (Number(addNewHamster.age) < 11) && age.length < 3 && !age.includes('.')
  const lovesIsValid: boolean = addNewHamster.loves !== '' && addNewHamster.loves.length >= 2
  const favFoodIsValid: boolean = addNewHamster.favFood !== '' && addNewHamster.favFood.length >= 2
  const imgNameIsValid = imgNumber !== '' && (Number(imgNumber) >= 1) && (Number(imgNumber) < 41) && imgNumber.length < 3 && !imgNumber.includes('.')

  const formIsValid = nameIsValid && ageIsValid && lovesIsValid && favFoodIsValid && imgNameIsValid

  useEffect(() => { setDidMount(true) }, [formIsValid])

  // Show error message if name is not valid.
  useEffect(() => {
    if (didMount) {
      if (!nameIsValid || addNewHamster.name === null) {
        setMaybeName(
          <div className='error-message'>
            <p>Hamster name must be at least two characters.</p>
          </div>)
      } else {
        setMaybeName(null)
      }
    }
  }, [name])

  const setHamsterName = (event: React.ChangeEvent<HTMLInputElement>) => {
      let name: string = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)
      setName(name)
  }

  // Show error message if age is not valid.
  useEffect(() => {
    if (didMount) {
      if (!ageIsValid || addNewHamster.age === null) {
        setMaybeAge(
          <div className='error-message'>
            <p>Age must always be a full number between 0 and 10.</p>
          </div>)
      } else {
        setMaybeAge(null)
      }
    }
  }, [age])

  // Show error message if loves is not valid.
  useEffect(() => {
    if (didMount) {
      if (!lovesIsValid || addNewHamster.loves === null) {
        setMaybeLoves(
          <div className='error-message'>
            <p>Loves must be at least two characters.</p>
          </div>)
      } else {
        setMaybeLoves(null)
      }
    }
  }, [loves])

  // Show error message if favFood is not valid.
  useEffect(() => {
    if (didMount) {
      if (!favFoodIsValid || addNewHamster.favFood === null) {
        setMaybeFavFood(
          <div className='error-message'>
            <p>Favorite food must be at least two characters.</p>
          </div>)
      } else {
        setMaybeFavFood(null)
      }
    }
  }, [favFood])

  // Show error message if imgName is not valid.
  useEffect(() => {
    if (didMount) {
      if (!imgNameIsValid || addNewHamster.imgName === null) {
        setMaybeImgName(
          <div className='error-message'>
            <p>Image number has to be a number between 1 and 40.</p>
          </div>)
      } else {
        setMaybeImgName(null)
      }
    }
  }, [imgNumber])

  const handleAddHamster = async () => {
    await fetch(fixUrl('/hamsters'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addNewHamster)
    })
    setDidMount(false)
    setName('')
    setAge('')
    setLoves('')
    setFavFood('')
    setImgNumber('')
    props.addItem(addNewHamster)
  }

  return (
    <div ref={props.addHamsterRef} className='add-hamster-form'>
      <h3>Add your hamster!</h3>
      <p>Fill in the form below, then click 'Add hamster' to send your hamster to the database.</p>
      <div className='hamster-input'>
        <label id='icon' htmlFor='name'><i className='fas fa-user'></i></label>
        <input type='text' name='name' id='name' placeholder='Name' onChange={setHamsterName} value={name} required/>
      </div>
      <div className='hamster-input'>
        <label id='icon' htmlFor='age'><i className='fas fa-calendar-days'></i></label>
        <input type='text' name='age' id='age' placeholder='Age (0-10)' onChange={event => setAge(event.target.value)} value={age} required/>
      </div>
      <div className='hamster-input'>
        <label id='icon' htmlFor='loves'><i className='fas fa-heart'></i></label>
        <input type='text' name='loves' id='loves' placeholder='Loves' onChange={event => setLoves(event.target.value.toLowerCase())} value={loves} required/>
      </div>
      <div className='hamster-input'>
        <label id='icon' htmlFor='favfood'><i className='fas fa-carrot'></i></label>
        <input type='text' name='favfood' id='favfood' placeholder='Favorite food' onChange={event => setFavFood(event.target.value.toLowerCase())} value={favFood} required/>
      </div>
      <div className='hamster-input'>
        <label id='icon' htmlFor='imgnumber'><i className='fas fa-image'></i></label>
        <input type='text' name='imgnumber' id='imgnumber' placeholder='Image number (1-40)' onChange={event => setImgNumber(event.target.value)} value={imgNumber} required/>
      </div>
      <div className='error-messages'>
        {maybeName}
        {maybeAge}
        {maybeLoves}
        {maybeFavFood}
        {maybeImgName}
      </div>
      <button className='button-yes' disabled={!formIsValid} onClick={handleAddHamster} >Add hamster</button>
    </div>
  )
}

export default AddHamsterForm
