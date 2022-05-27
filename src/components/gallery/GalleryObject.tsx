import { fixUrl } from '../../utils'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  name: string,
  id: string,
  imgName: string,
  removeItem: (id: string) => void
}

const GalleryObject = (props: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  let deleteVisibleCss = isVisible ? 'confirm-delete' : 'confirm-delete-hidden'

  const changeVisibility = () => setIsVisible(!isVisible)


  const handleRemoveHamster = () => {
    fetch(fixUrl('/hamsters/' + props.id), {
      method: 'DELETE'
    })
    props.removeItem(props.id)
  }

  return (
    <div className='gallery-object'>
      <Link to={props.id}>
      <img src={fixUrl('/img/' + props.imgName)} alt='' />
      <h2> { props.name } </h2>
      </Link>
      <div className='remove-hamster' onClick={changeVisibility}>
        <p>Remove</p>
      </div>
      <div className={deleteVisibleCss}>
        <p>Are you sure you want to delete { props.name }?</p>
        <button className='button-yes' onClick={handleRemoveHamster}>Yes</button>
        <button className='button-no' onClick={changeVisibility}>No</button>
      </div>
    </div>
  )
}

export default GalleryObject
