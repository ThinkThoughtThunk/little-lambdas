import { Model } from './Model'

export type State = { products: Product[]; cart: ShoppingCart }

// Helper Types

export type Product = { id: ProductId; name: String; price: Price }

export type ShoppingCart = ProductInCart[]
export type ProductInCart = [ProductId, Quantity]

export type ProductId = number
export type Quantity = number

export type Cost = number
export type Currency = 'USD' | 'EUR' | 'GBP'
export type Price = [Currency, Cost]

const state = new RequestState('Failed', 'Connection reset.')
const progressPercentage = state.caseOf({
  Downloading: pct => pct,
  Completed: () => 100,
  _: () => 0,
})

const ProductCount = Tagged('ProductCount', IntegerBetween(0, 100))
const Cart = Tagged.Union('Cart', {
  Empty: Tagged.NonEmptyList(new Set<ProductId>([])),
  NonEmpty: Tagged.EmptyList([]),
})
const Integer = Tagged('Integer', Number, Number.isInteger)
const ProductId = Tagged('ProductId', Integer)
const ProductState = Model.of('ProductState').isOneOf({
  NotAsked: true,
  Loading: false,
  Failure: false,
  Success: false,
})

// .which
// .isOneOf
// .is

// Opaque Type = subset of type
// Number | Object | String | Boolean | Array | Function | Symbol | undefined | null
//

const ProductCount =
const ProductCount = ('ProductCount')
// type ProductState = Model.Task
// type ProductState = Model.oneOf<
//   'NotAsked',
//   'Loading',
//   ['Failure', []],
//   ['Success', []]
// >

// View

function ProductsPage({ productIds, children }) {
  const [state, updates] = Tagged.useState({
    initialize: [productIds.forEach(fetchProduct)],

    state: {
      cart: Cart.Empty(),
      productStates: new Map([]),
    },

    updates: {
      fetchProduct: (state, update) =>
        state.products.put(update.product.id, update.product),

      viewProductDetails: (state, update) =>
        viewProductDetails(update.product, state.cart),

      addProductToCart: (state, update) =>
        state.cart.caseOf({
          Empty: () => <EmptyCart />,
          NonEmpty: () => (
            <YourCart
              cart={state.cart}
              onAddProduct={product =>
                product.caseOf({
                  Success: product => state.cart.add(product),
                  _: () => console.log('Cannot add product to cart'),
                })
              }
            />
          ),
        }),

      removeItemFromCart: (state, update) =>
        state.cart.caseOf({
          Empty: () => <EmptyCart />,
          NonEmpty: () => (
            <YourCart
              cart={state.cart}
              onAddProduct={product =>
                state.cart.has(product)
                  ? state.cart.delete(product)
                  : console.log('Cannot delete product from cart')
              }
            />
          ),
        }),
    },
  })

  return (
    <>
      <Header />
      <Main direction="vertical" spacing="1rem">
        <TaskProvider value={{ cart }}>{children}</TaskProvider>
        {productStates.map((product, id) => (
          <Card product={product} id={id} cart={state.cart} />
        ))}
      </Main>
      <Footer />
    </>
  )
}

function Card({ id, product, cart }) {
  return (
    <Card key={id}>
      <Card.Title></Card.Title>
      {product.caseOf({
        NotAsked: () => <LoadingSkeleton />,
        Loading: () => <LoadingSkeleton />,
        Success: product => <Product product={product} />,
        Failure: error => (
          <div>
            <Banner>Error: {error}</Banner>
            <button onClick={() => fetchProduct(id)}>Reload Product</button>
          </div>
        ),
      })}
      <Card.Footer alignITems="right" gap="1rem">
        {cart.caseOf({
          Empty: () =>
            !cart.has(id) && (
              <button onClick={() => addProductToCart(id)}>Add Product</button>
            ),
          NonEmpty: itemSet =>
            itemSet.has(id) && (
              <button onClick={() => removeItemFromCart(id)}>
                Remove Product
              </button>
            ),
        })}
      </Card.Footer>
    </Card>
  )
}

function fetchProduct(id: ProductId): Task<ProductState> {
  return Task.of(
    ProductState.Success({
      id,
      name: 'Product Name',
      description: 'Product Description',
      price: 100,
    })
  )
}
