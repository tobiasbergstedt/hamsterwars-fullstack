import { useState } from "react"
import { Hamster } from "../../models/Hamster"
import { fixUrl } from "../../utils"

interface Props {
  winnerId: string,
  loserId: string,
  id: string,
  hamstersData: Hamster[] | null,
  removeItem: (id: string) => void
}

const MatchObject = (props: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  let deleteVisibleCss = isVisible ? 'confirm-delete' : 'confirm-delete-hidden'

  const changeVisibility = () => setIsVisible(!isVisible)

  const handleRemoveMatch = async() => {
    fetch(fixUrl('/matches/' + props.id), {
      method: 'DELETE'
    })
    if (props.hamstersData !== null) {
      let winningHamster = props.hamstersData.filter((p) => p.id === props.winnerId)[0]
      let updatedWinningHamster = { ...winningHamster, wins: winningHamster.wins - 1, games: winningHamster.games - 1 }
      await fetch(fixUrl('/hamsters/' + props.winnerId), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedWinningHamster)
      })

      let losingHamster = props.hamstersData.filter((p) => p.id === props.loserId)[0]
      let updatedLosingHamster = { ...losingHamster, defeats: losingHamster.defeats - 1, games: losingHamster.games - 1 }
      await fetch(fixUrl('/hamsters/' + props.loserId), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedLosingHamster)
      })
    }
    props.removeItem(props.id)
  }

  return (
    <div className='match-object'>
            <div className='left'>
              <h3>Winner</h3>
              <div className='img-container'>
                <img src={fixUrl(props.hamstersData !== null && props.hamstersData.filter((p) => p.id === props.winnerId)[0] !== undefined ? '/img/' + props.hamstersData.filter((p) => p.id === props.winnerId)[0].imgName : '/assets/no-hamster.png')} alt={'Image of' + (props.hamstersData !== null &&  props.hamstersData.filter((p) => p.id === props.winnerId)[0] !== undefined ? props.hamstersData.filter((p) => p.id === props.winnerId)[0].name : 'winner')} />
              </div>
              <p>{props.hamstersData !== null && props.hamstersData.filter((p) => p.id === props.winnerId)[0] !== undefined ? props.hamstersData.filter((p) => p.id === props.winnerId)[0].name : 'Deleted'}</p>
            </div>
            <div className='middle'>
              <p>vs</p>
            </div>
            <div className='right'>
              <h3>Loser</h3>
              <div className='img-container'>
                <img src={fixUrl(props.hamstersData !== null && props.hamstersData.filter((p) => p.id === props.loserId)[0] !== undefined ? '/img/' + props.hamstersData.filter((p) => p.id === props.loserId)[0].imgName : '/assets/no-hamster.png')} alt={'Image of' + (props.hamstersData !== null && props.hamstersData.filter((p) => p.id === props.loserId)[0] !== undefined ? props.hamstersData.filter((p) => p.id === props.loserId)[0].name : 'loser')} />
              </div>
              <p>{props.hamstersData !== null && props.hamstersData.filter((p) => p.id === props.loserId)[0] !== undefined ? props.hamstersData.filter((p) => p.id === props.loserId)[0].name : 'Deleted'}</p>
            </div>
            <div className='remove-match' onClick={changeVisibility}>
              <p>X</p>
            </div>
            <div className={deleteVisibleCss}>
              <p>Are you sure you want to delete this battle?</p>
              <button className='button-yes' onClick={handleRemoveMatch}>Yes</button>
              <button className='button-no' onClick={changeVisibility}>No</button>
            </div>
          </div>
  )
}

export default MatchObject
