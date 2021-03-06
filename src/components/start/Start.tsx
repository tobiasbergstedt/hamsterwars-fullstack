import './Start.css'

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { fixUrl } from '../../utils'
import { Hamster } from '../../models/Hamster'

const Start = () => {
  const [hamsterData, setHamsterData] = useState<Hamster[] | null>(null)

  useEffect(() => {
    async function getData() {
      const response: Response = await fetch(fixUrl('/hamsters/cutest'))
      const apiData: any = await response.json()
      setHamsterData(apiData as Hamster[])
    }
    getData()
  },[])

  let winWidth: number = 0
  let loseWidth: number = 0
  let winsDifference: number = 0
  if (hamsterData !== null) {
    winWidth = (Math.round((hamsterData[0].wins/hamsterData[0].games)*100))
    loseWidth = (Math.round((hamsterData[0].defeats/hamsterData[0].games)*100))
    winsDifference = hamsterData[0].wins - hamsterData[0].defeats
  }

  return (
    <section className='start'>
      <div className='start-info'>
        <h1><span>Welcome to</span> <span><b>the Hamster Wars</b></span></h1>
        <p>Your number 1 go-to place when it comes to hamsters, hamster battles and all things cute. This website is dedicated to finding the cutest hamster of them all. And to do that, we're going to need <b>YOUR</b> help. </p>
      </div>
      {hamsterData ? <div className='winner'>
        <p className='last-p'>{hamsterData[0].name} is our current winner:</p>
        <div className='most-winnerest'>
          <div className='hamster-info'>
            <Link to={'/gallery/' + hamsterData[0].id}><h2><img className='crown' src={fixUrl('/assets/' + 'crown.png')} alt='' />{hamsterData[0].name}, <span className='win-age'>age {hamsterData[0].age}</span></h2></Link>
            <p>Win difference: {winsDifference} ({winWidth}% wins)</p>
            <Link to={'/gallery/' + hamsterData[0].id} className='cutest-pic'><img src={fixUrl('/img/' + hamsterData[0].imgName)} alt='The cutest hamster of them all! (Best win ratio)' /></Link>
          </div>
          <div className='winnerest-info'>
              <p>Loves: {hamsterData[0].loves}</p>
              <p>Favorite food: {hamsterData[0].favFood}</p>
              <p>Battles fought: {hamsterData[0].games}</p>
              <div className='statistics-div'>
                <p className='wins'>Wins: {hamsterData[0].wins}</p>
                <p className='losses'>Losses: {hamsterData[0].defeats}</p>
              </div>
              <div className='graph-div'>
                <div className='graph1' style={loseWidth > 0 ? {width: winWidth - 0.5 + '%'} : {width: winWidth + '%'}} />
                <div className='graph-divider' style={loseWidth > 1 ? {width: '1%'} : {width: '0%'}} />
                <div className='graph2' style={winWidth > 0 ? {width: loseWidth - 0.5 + '%'} : {width: loseWidth + '%'}} />
              </div>
          </div>
        </div>
      </div> :
      <div className='winner'>
        <div className='most-winnerest'>
          <h2><img className='crown' src={fixUrl('/assets/' + 'crown.png')} alt='' />?????, <span className='win-age'>age ?</span></h2>
          <p>Win difference: ??? (?%)</p>
          <img className='cutest-pic cutest-not-found' src={fixUrl('/assets/' + 'no-hamster.png')} alt='The cutest hamster of them all! (Best win ratio)' />
          <div className='winnerest-info'>
            <div className='reload'>
              <p>Couldn't load hamster, server might be down. Wanna try again?</p>
              <button className='button-no'>Reload hamster</button>
            </div>
            <div className='statistics-div'>
              <p className='wins'>Wins: ?</p>
              <p className='losses'>Losses: ?</p>
            </div>
            <div className='graph-div-2'>
            </div>
          </div>
        </div>
      </div>}

      <div className='info-box'>
        <h3>How it all works:</h3>
        <p>You can upload new hamsters to the database, as well as remove existing ones. Navigate to the 'Gallery' tab to do this.</p>
        <p>You can battle hamsters under the 'Battle' tab. This is how the cutest hamster is chosen. You will get the images of two hamsters, of which you will have to choose the cutest one. This result will then be sent to our server, and the statistics updated accordingly.</p>
        <p>These statistics are then used to calculate the cutest hamster of them all, i.e. the one with the highest win difference (wins - losses). The winner is the one displayed, in all His/Her glory, above.</p>
      </div>
    </section>
  )
}

export default Start
