import { Product } from '../models/Product'
import {Navigate, useParams} from 'react-router-dom'
import { useRecoilState} from 'recoil'
import {productsAtom} from '../atoms/Products'

const SingleProduct = () => {
  const [products, setProducts] = useRecoilState(productsAtom)
  const {productid} = useParams()
  const selected = products.find(product => product.id === productid)

  return (
    <div className='single-product'>
      {selected !== undefined ? (
        <>
          <h2>{ selected.name } </h2>
          <img src={selected.img} />
        </>
      ) : (
        <Navigate to='/404' />
      )}
    </div>
  )
}

export default SingleProduct
