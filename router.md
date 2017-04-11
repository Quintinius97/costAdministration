# REST Documentation
## User
### Login
**POST**
/user/login
```
{
    "username": "myUserName",
    "password: "myPassword"
}
```
Returns
```
{
    "jwt": "asfdgjhgfdsadfgdsadfgh"
}
```
### Register
**POST**
/user/register
```
{
    "name": "Hans Meier",
    "username": "myUserName",
    "password": "myPassword"
}
```
Returns
```
{
    "jwt": "asfdgjhgfdsadfgdsadfgh"
}
```

## Costs
### GetbyID
**GET**
/cost/<id>
```
Header: Authorization: jwt
```
Returns:
```
{
    "id": 1,
    "title": "New Car",
    "desc": "I have bought a new car",
    "category": "Transport",
    "date": epochtime,
    "price": 20000,
    "currency": "EUR"
}
```
### Get all
**GET**
/cost/all
```
Header: Authorization: jwt
```
Returns:
```
[
    {
        "id": 1,
        "title": "New Car",
        "desc": "I have bought a new car",
        "category": "Transport",
        "date": epochtime,
        "price": 20000,
        "currency": "EUR"
    },
    ...
]
```
### Add
**POST**
/cost
```
Header: Authorization: jwt

Body:
{
    "title": "New Car",
    "desc": "I have bought a new car",
    "category": "Transport",
    "date": epochtime,
    "price": 20000,
    "currency": "EUR"
}
```
### DeleteByID
**DELETE**
/cost/<id>
```
Header: Authorization: jwt
```
## Category
### addCategory
**POST**
/category
```
Header: Authorization: jwt

Body:
{
    "name": "Transport",
    "color": "#ff0000",
    "desc": "Getting me from A to B"
}
```
### get All Categories
**GET**
/category/all
```
Header: Authorization: jwt
```
Returns:
```
[
    {
        "name": "Transport",
        "color": "#ff0000",
        "desc": "Getting me from A to B"
    },
    ...
]
```
### get Category by ID
**GET**
/category/<id>
```
Header: Authorization: jwt
```
Returns:
```
{
    "name": "Transport",
    "color": "#ff0000",
    "desc": "Getting me from A to B"
}
```
### DeleteByID
**DELETE**
/category/<id>
```
Header: Authorization: jwt
```