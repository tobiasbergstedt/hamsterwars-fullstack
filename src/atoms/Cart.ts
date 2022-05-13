import { atom } from "recoil"
import { Product } from "../models/Product"

const cartAtom = atom<Product[]>({
  key: 'cartAtom',
  default: []
})

export { cartAtom }
