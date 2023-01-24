const state = new RequestState('Failed', 'Connection reset.');
const progressPercentage = state.caseOf({
  Downloading: pct => pct,
  Completed: () => 100,
  _: () => 0,
});

const ProductCount = Tagged('ProductCount', IntegerBetween(0, 100));
const Cart = Tagged.Union('Cart', {
  Empty: Tagged.NonEmptyList(new Set() < ProductId > []),
  NonEmpty: Tagged.EmptyList([]),
});
const Integer = Tagged('Integer', Number, Number.isInteger);
const ProductId = Tagged('ProductId', Integer);
const ProductState = Tagged.Union('ProductState', {
  NotAsked: true,
  Loading: false,
  Failure: false,
  Success: false,
});

function ProductsPage({ ids, children }) {
  const [state, updates] = Tagged.useState({
    initialEffects: [ids.forEach(fetchProduct)],

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
  });

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
  );
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
  );
}
