import { atom } from "recoil"
import { Product } from "../models/Product"
import { data } from '../data'

const productsAtom = atom<Product[]>({
  key: 'productsAtom',
  default: data
})

export { productsAtom }
