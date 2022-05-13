import { useRecoilState } from 'recoil'
import { cartAtom } from '../atoms/Cart'
import { productsAtom } from '../atoms/Products'
import { Link } from 'react-router-dom'

const ProductGrid = () => {
  const [ cart, setCart] = useRecoilState(cartAtom)
  const [ products, setProducts] = useRecoilState(productsAtom)

  return (
    <div className="product-grid">
      {products.map(product => (
        <div key={product.id} className='product'>
          <Link to={'products/'+ product.id}>
          <h3>{product.name}</h3>
          <img src={product.img} />
          </Link>
          <button onClick={() => {setCart([...cart, product])}}>Add to cart</button>
        </div>
      ))}
    </div>
    // <div className="product-grid">
    //   {products.map(product => (
    //     <div key={product.id} className='product'>
    //       <Link to={product.id}>
    //       <h3>{product.name}</h3>
    //       <img src={product.img} />
    //       </Link>
    //       <button onClick={() => {setCart([...cart, product])}}>Add to cart</button>
    //     </div>
    //   ))}
    // </div>
  )
}

export default ProductGrid
