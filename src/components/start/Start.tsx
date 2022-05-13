import './Start.css'
import { Link } from 'react-router-dom'

import { fixUrl } from '../../utils'

import crownImage from '../../../assets/crown.png'

const Start = () => {
  let width1 = (Math.floor((130/152)*100)+'%')
  let width2 = (Math.ceil((22/152)*100)+'%')

  return (
    <section className="start">
      {/* <p>http://tobias-hamsterwars.herokuapp.com/hamsters/cutest</p> */}
      <div className='start-info'>
        <h1><span>Welcome to</span> <span><b>the Hamster Wars</b></span></h1>
        <p>Your number 1 go-to place when it comes to hamsters, hamster battles and all things cute.</p>
        <p>This website is dedicated to finding the cutest hamster of them all. And to do that, we need <b>YOUR</b> help. </p>
        <p className='last-p'>Wheelieeee is our current winner:</p>
      </div>
      <div className='most-winnerest'>
        <Link to='/'><h2><img className='crown' src={crownImage} alt="" />Wheelieeee, <span className='win-age'>age 3</span></h2></Link>
        <p>Win difference: 108 ({width1})</p>
        <img className='cutest-pic' src={fixUrl("/img/hamster-12.jpg")} alt="The cutest hamster of them all! (Best win ratio)" />
        <div className='winnerest-info'>
            <p>Loves to: titta på när andra springer</p>
            <p>Favorite food: cornflakes</p>
            <p>Battles fought: 152</p>
            <div className='statistics-div'>
              <p className='wins'>Wins: 130</p>
              <p className='losses'>Losses: 22</p>
            </div>
            <div className='graph-div'>
              <div className='graph1' style={{width: width1}} />
              <div className='graph2' style={{width: width2}} />
            </div>
        </div>
      </div>
      <div className="info-box">
        <h3>How it all works:</h3>
        <p>You can upload new hamsters to the database, as well as remove existing ones. Navigate to the "Gallery" tab to do this.</p>
        <p>You can battle hamsters under the "Battle" tab. This is how the cutest hamster is chosen. You will get the images of two hamsters, of which you will have to choose the cutest one. This result will then be sent to our server, and the statistics updated accordingly.</p>
        <p>These statistics are then used to calculate the cutest hamster of them all, i.e. the one with the highest win difference (wins - losses). The winner is the one displayed, in all His/Her glory, above.</p>
      </div>
    </section>
  )
}

export default Start
