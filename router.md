# REST Documentation
## User
### Login
**POST**
/user/login
```json
{
    "username": "myUserName",
    "password": "myPassword"
}
```
Returns
```json
{
    "jwt": "eyJhbGckpXVCJ9.eyJzdWIiOiIxMjM0NTaW4iOnRydWV9.TJVA95OrM7E2cBab30RMH"
}
```
### Register
**POST**
/user/register
```json
{
    "name": "Hans Meier",
    "username": "myUserName",
    "password": "myPassword"
}
```
Returns
```json
{
    "jwt": "eyJhbGckpXVCJ9.eyJzdWIiOiIxMjM0NTaW4iOnRydWV9.TJVA95OrM7E2cBab30RMH"
}
```
### Update User
**POST**
/user
```json
{
    "?name": "Hans Meier",
    "?password": "myPassword"
}
```

## Costs
### GetbyID
**GET**
/cost/\<id>
```
Header: Authorization: jwt
```
Returns:
```json
{
    "id": 1,
    "title": "New Car",
    "?desc": "I have bought a new car",
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
```json
[
    {
        "id": 1,
        "title": "New Car",
        "?desc": "I have bought a new car",
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
```json
Header: Authorization: jwt

Body:
{
    "title": "New Car",
    "?desc": "I have bought a new car",
    "category": "Transport",
    "date": epochtime,
    "price": 20000,
    "currency": "EUR"
}
```
### DeleteByID
**DELETE**
/cost/\<id>
```
Header: Authorization: jwt
```
## Category
### addCategory
**POST**
/category
```json
Header: Authorization: jwt

Body:
{
    "name": "Transport",
    "color": "#ff0000",
    "?desc": "Getting me from A to B"
}
```
### get All Categories
**GET**
/category/all
```
Header: Authorization: jwt
```
Returns:
```json
[
    {
        "name": "Transport",
        "color": "#ff0000",
        "?desc": "Getting me from A to B"
    },
    ...
]
```
### get Category by ID
**GET**
/category/\<id>
```
Header: Authorization: jwt
```
Returns:
```json
{
    "name": "Transport",
    "color": "#ff0000",
    "?desc": "Getting me from A to B"
}
```
### DeleteByID
**DELETE**
/category/\<id>
```
Header: Authorization: jwt
```