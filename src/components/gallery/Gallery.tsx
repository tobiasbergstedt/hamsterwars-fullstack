import './Gallery.css'

import { useEffect, useRef, useState } from 'react'

import { fixUrl } from '../../utils'
import { Fruit } from '../../models/Fruit'
import { Hamster } from '../../models/Hamster'
import { AddNewHamster } from '../../models/AddNewHamster'
import { NewHamster } from '../../models/NewHamster'

import GalleryObject from './GalleryObject'
import AddHamsterForm from './AddHamsterForm'
import { useRecoilState } from 'recoil'
import hamsterAtom from '../../atoms/Hamsters'

const Gallery = () => {
  const [data, setData] = useState<Hamster[] | null | undefined>(null)
  const [allHamstersData, setAllHamstersData] = useRecoilState<Hamster[]>(hamsterAtom)
  const [tryAgain, setTryAgain] = useState<boolean>(false)

  const addHamsterRef = useRef<null | HTMLDivElement>(null)
  const executeScroll = () => {
    if (addHamsterRef.current !== null) {
      addHamsterRef.current.scrollIntoView({
        behavior: 'smooth'
      })
    } else {
      return
    }
  }

  useEffect(() => {
    async function getData() {
      const response: Response = await fetch(fixUrl('/hamsters'))
      const apiData: any = await response.json()
      setData(apiData as Hamster[])
      setAllHamstersData(apiData as Hamster[])
    }
    getData()
  },[])

  // useEffect(() => {
  //   if (data !== null && data !== undefined) {
  //     setAllHamstersData(data)
  //     console.log(allHamstersData);
  //   }
  // },[data])

  let removeContent = (id: string) => {
    let filteredHamsters: Hamster[] | undefined = data?.filter(hamster =>
      hamster.id !== id
    )
    setData(filteredHamsters);
  }

  let addContent = (addNewHamster: AddNewHamster) => {
    let hamsterToAdd: Hamster = {...addNewHamster, id: 'jy46asd456btyi4o'}
    if (data !== null && data !== undefined) {
      let newData: Hamster[] = [...data, hamsterToAdd]
      setData(newData)
    }
    if (data === null || data === undefined) {
      let newData: Hamster[] = [hamsterToAdd]
      setData(newData)
    }
  }

  return (
    <section className='gallery'>
      <h1>Gallery</h1>
      <p>These are all hamsters in our database. You can click on their name or picture to find out more about them. You can also add or remove hamsters.</p>
      <p>To remove a hamster, click on the remove button in the top right corner of that hamsters image, and confirm with the yes button that slides in from the left.</p>
      <p>To add a hamster to the database, use the form at the bottom of the page. Click the button below to go directly there.</p>
      <button className='button-yes go-to-button' onClick={executeScroll}>Go to form</button>
      <div className='gallery-grid'>
        {data && data.length>=1 ? data.map(({name, imgName, id}) => (
          <GalleryObject key={id} id={id} name={name} imgName={imgName} removeItem={removeContent} />
        )) :
          <div className='no-hamsters'>
            <p>Could not find any hamsters. Wanna try to find the hamsters again?</p>
            <button className='button-no' onClick={() => setTryAgain(!tryAgain)}>Try again</button>
          </div>
        }
      <AddHamsterForm addHamsterRef={addHamsterRef} addItem={addContent} />
      </div>
    </section>
  )
}

export default Gallery
