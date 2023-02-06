# Spec

## State
> `State` describes the current value of everything that can change in our application.
> 
> ```typescript
> type State :: 
>   { products : [Product]
>   , cart : [ProductId, Quantity]
>   }
>
> ----------------------------------------
> ------------- Helpers ------------------
> ----------------------------------------
> 
> type ProductId = Int
> 
> type Cost = Float
> type Currency = USD | EUR | GBP
> type Price = [Currency, Cost]
>
> type Product = 
>   { id: ProductId
>   , name: String 
>   , price: Price
>   }
>
> type Quantity = Int
> ```

## Action
> An `Action` is an event that affects our application. `Action`s change our app's `State` or trigger side effects.
> 
> An `Action` has a `name` and possibly some `data` that is tied to the action.
> 
> `Action<Data> :: { name: String, data: Data }`

## Update
> `Update` 


## View
> View is the projection of State to a UI. In other words, it's a pure function `State -> UI` where UI is some kind of visualization (React component tree, HTML, etc.).