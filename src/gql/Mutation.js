const { gql } = require("@apollo/client");

const MakeStanderOrder = gql`
mutation Mutation($username: String!, $phone: String!, $address: String!, $amount: [Float!]!, $otherPhone: String, $productOrder: [ID!], $discountCode: ID) {
  makeOrder(username: $username, phone: $phone, address: $address, amount: $amount, otherPhone: $otherPhone, productOrder: $productOrder, discountCode: $discountCode) {
    id
    username
    phone
    otherPhone
    address
    amount
    customHeight
    customWidth
    customeImage
    productOrder {
      id
      image
      price
      productSize {
        id
        height
        width
      }
    }
    discountCode {
      code
      discount
      expired
    }
    delivered
  }
}
`
const MakeCustomOrder = gql`
mutation Mutation($username: String!, $phone: String!, $address: String!, $amount: [Float!]!, $otherPhone: String, $discountCode: ID, $customeImage: Upload, $customWidth: Float, $customHeight: Float, $customPrice: Float, $comment: String) {
  makeOrder(username: $username, phone: $phone, address: $address, amount: $amount, otherPhone: $otherPhone, discountCode: $discountCode, customeImage: $customeImage, customWidth: $customWidth, customHeight: $customHeight, customPrice: $customPrice, comment: $comment) {
    id
    username
    phone
    otherPhone
    address
    amount
    comment
    customeImage
    customWidth
    customPrice
    customHeight
    delivered
    discountCode {
      code
      discount
      expire
    }
    productOrder {
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
}
`


export { MakeStanderOrder, MakeCustomOrder }