
# Backend Assesment 
Building a Comprehensive Pizza Delivery System with User Management


## API Reference


#### List available pizza types and their prices.


```http
  GET /api/AllPizza
```



### user login
```http
  POST /api/user/signin
   ->user can login using this api
   -> Authenticate a user and return a token.
```

### user Register
```http
  POST /api/user/signup
  ->user can Register using this api
```

### Place Orders
```http
  POST api/user/orders
   user can place order(only accessible to logged-in users).
```
### Get All Order
```http
  GET api/user/orders/:id
   user can get All order(only accessible to logged-in users).
```

### Get Order by id
```http
  GET api/user/orders/:id
   user can get specific order(only accessible to logged-in users).
```

### Update  Order by id
```http
  PUT api/user/orders/:id
   user can get specific order(only accessible to logged-in users).
```

### Delete Order by id
```http
  Delete api/user/orders/:id
   user can get specific order(only accessible to logged-in users).
```
## Tech Stack



**Server:** Node, Express,Mongo-DB

