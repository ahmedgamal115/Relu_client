const { gql } = require("@apollo/client");

const GetSizes = gql`
query SizesFeed {
  sizesFeed {
    id
    width
    height
  }
}
`
const GetProducts = gql`
query productsFeed {
  productsFeed {
    id
    image
    price
    productSize {
      id
      width
      height
    }
  }
}
`
const GetProductsBySize = gql`
query ProductBySize($productSize: ID!) {
  productBySize(productSize: $productSize) {
    id
    image
    price
    productSize {
      id
      width
      height
    }
  }
}
`

const GetProductsById = gql`
query Product($productId: ID!) {
  product(id: $productId) {
    id
    image
    price
    productSize {
      id
      width
      height
    }
  }
}
`
const CheckPromoCode = gql`
query Query($code: String!) {
  checkPromocode(code: $code) {
    id
    code
    expire
    expired
    discount
    amount
  }
}
`

export { GetSizes, GetProducts, GetProductsBySize, 
          GetProductsById, CheckPromoCode }