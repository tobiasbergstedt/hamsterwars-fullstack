import { useEffect, useState } from 'react'
import { Hamster } from '../../models/Hamster'
import { fixUrl } from '../../utils'

interface Props {
  hamster: Hamster,
  setHasVoted: (s: boolean) => void,
  hasVoted: boolean,
  setIsWinner: (s: string) => void
}

const BattleHamster = (props: Props) => {
  let winWidth: number = 0
  let loseWidth: number = 0
  if (props.hamster.games !== null && props.hamster.wins !== null && props.hamster.defeats !== null) {
    winWidth = (Math.round((props.hamster.wins/props.hamster.games)*100))
    loseWidth = (Math.round((props.hamster.defeats/props.hamster.games)*100))

  }

  let maybe = null
  if (props.hasVoted) {
    maybe = <>
    <div className='statistics-div'>
      <p className='wins'>Wins: {props.hamster.wins}</p>
      <p className='losses'>Losses: {props.hamster.defeats}</p>
    </div>
    <div className='graph-div'>
      <div className='graph1' style={loseWidth > 0 ? {width: winWidth - 0.5 + '%'} : {width: winWidth + '%'}} />
      <div className='graph-divider' style={loseWidth > 1 ? {width: '1%'} : {width: '0%'}} />
      <div className='graph2' style={winWidth > 0 ? {width: loseWidth - 0.5 + '%'} : {width: loseWidth + '%'}} />
    </div>
    </>
  }

  const onChooseWinner = () => {
    props.setHasVoted(true)
    props.setIsWinner(props.hamster.id)
  }

  return (
    <div key={props.hamster.id} className={!props.hasVoted ? 'hamster-object' : 'disabled-hamster'} onClick={onChooseWinner}>
      <img src={fixUrl('/img/' + props.hamster.imgName)} alt='' />
      <h2>{props.hamster.name}</h2>
      {maybe}
    </div>
  )
}

export default BattleHamster
