import { useRecoilState } from 'recoil'
import { cartAtom } from '../atoms/Cart'
import { useState, useEffect, useRef } from "react"

interface Hamster {
  name: string,
  id: string,
  age: number,
  loves: string,
  favFood: string,
  imgName: string,
  games: number,
  wins: number,
  defeats: number
}

const ShowCart = () => {
  const [data, setData] = useState<null | Hamster>(null)
  const [data2, setData2] = useState<null | Hamster>(null)
  const dataRef = useRef(data)

  useEffect(() => { dataRef.current = data })
  useEffect(() => {
    // function getRandomHamster() {
    //   fetch('http://tobias-hamsterwars.herokuapp.com/hamsters/random')
    //   .then(response => {
    //     return response.json()
    //   })
    //   .then(data => {
    //     if (data2 !== null && (data.id === data2.id)) {
    //       getRandomHamster()
    //     } else {
    //       setData(data)
    //     }
    //   })
    // }
    function getRandomHamster() {
      fetch('http://tobias-hamsterwars.herokuapp.com/hamsters/random')
      .then(response => {
        return response.json()
      })
      .then(data => {
          setData(data)
      })
      fetch('http://tobias-hamsterwars.herokuapp.com/hamsters/random')
      .then(response => {
        return response.json()
      })
      .then(data2 => {
        if (dataRef.current !== null && (data2.id === dataRef.current.id)) {
          console.log('Duplicate!');
          getRandomHamster()

        } else if (dataRef.current === null) {
          console.log('dataRef is null.');

          getRandomHamster()
        } else {
          console.log('No duplicate');
          setData2(data2)
        }
      })
    }
    getRandomHamster()
    // function getRandomHamster2() {
    //   fetch('http://tobias-hamsterwars.herokuapp.com/hamsters/random')
    //   .then(response => {
    //     return response.json()
    //   })
    //   .then(data2 => {
    //     if (data !== null && (data2.id === data.id)) {
    //       getRandomHamster2()
    //     } else {
    //       setData2(data2)
    //     }
    //   })
    // }
    // getRandomHamster2()
  },[])



  return (
    <div className='battle'>
      <h3>Random hamster</h3>
      {data !== null ? <div key={data.id} className='hamster-object'>
            {data.name}
            <br />
            {data.age}
            <br />
            {data.id}
            <br />
            {data.loves}
            <br />
            {data.favFood}
            <br />
            <img src={'/hamsters/' + data.imgName} alt="" />
          </div> : <div>No data yet.</div>}
      {data2 ? <div key={data2.id} className='hamster-object'>
            {data2.name}
            <br />
            {data2.age}
            <br />
            {data2.id}
            <br />
            {data2.loves}
            <br />
            {data2.favFood}
            <br />
            <img src={'/hamsters/' + data2.imgName} alt="" />
          </div> : <div>No data yet.</div>}
    </div>
  )
}

export default ShowCart




// import { useRecoilState } from 'recoil'
// import { cartAtom } from '../atoms/Cart'
// import { useState, useEffect } from "react"

// interface Hamster {
//   name: string,
//   id: string,
//   age: number,
//   loves: string,
//   favFood: string,
//   imgName: string,
//   games: number,
//   wins: number,
//   defeats: number
// }

// const ShowCart = () => {
//   const [data, setData] = useState<null | Hamster[]>(null)
//   const [data2, setData2] = useState<null | Hamster>(null)

//   useEffect(() => {
//     function getRandomHamster() {
//       fetch('http://tobias-hamsterwars.herokuapp.com/hamsters/random')
//       .then(response => {
//         return response.json()
//       })
//       .then(apiData => {
//         setData([...data, apiData as Hamster])
//       })
//     }
//     // function getMyData2() {
//     //   fetch('http://tobias-hamsterwars.herokuapp.com/hamsters/random')
//     //   .then(response => {
//     //     return response.json()
//     //   })
//     //   .then(data2 => {
//     //     setData2(data2)
//     //   })
//     // }
//     getRandomHamster()
//     // getMyData2()
//   },[])

//   return (
//     <div className='battle'>
//       <h3>Random hamster</h3>
//       {data !== null ? <div key={data[0].id} className='hamster-object'>
//             {data[0].name}
//             <img src={'/hamsters/' + data[0].imgName} alt="" />
//           </div> : <div>No data yet.</div>}
//       {data2 ? <div key={data2.id} className='hamster-object'>
//             {data2.name}
//             <img src={'/hamsters/' + data2.imgName} alt="" />
//           </div> : <div>No data yet.</div>}
//     </div>
//   )
// }

// export default ShowCart
