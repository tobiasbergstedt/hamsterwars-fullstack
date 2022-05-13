import { data } from '../data'
import { useParams } from 'react-router-dom'

const Product = () => {
  const params = useParams()

  let myProduct = data.find(product => product.id === params.product)

  return (
    <div className="product-grid">

      {
        (myProduct) ? (
            <>
              <img src={myProduct.img} alt="" />
              <p>{myProduct.name}</p>
            </>
        ) : `No item with article number ${params.product} found.`
      }
    </div>
  )
}

export default Product
