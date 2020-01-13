# Sample API

## `POST /auth/login`

### Request Body
- `username`: `String`
- `password`: `String`

### Response
- type: `Tokens`
```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxYmNhMmRlOS0wZTc3LTViNmUtODA0NS04OTU1Y2UxOGRhZTEiLCJpYXQiOjE1Nzg5Mjk0MDgsImV4cCI6MTU3ODkzMTIwOH0.MsLBnzO4i-vrucUyOq1q_iRT414m8j9P9VlZmwgt4u8",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxYmNhMmRlOS0wZTc3LTViNmUtODA0NS04OTU1Y2UxOGRhZTEiLCJpYXQiOjE1Nzg5Mjk0MDgsImV4cCI6MTU4MDEzOTAwOH0.qWenQ6eLof9qn0V_EnBfLURZZYNCJb7FG4Oc5vAL1po"
}
```

## `POST /auth/refresh`

### Request Body
- `refreshToken`: `String`

### Response
- type: `Tokens`
```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxYmNhMmRlOS0wZTc3LTViNmUtODA0NS04OTU1Y2UxOGRhZTEiLCJpYXQiOjE1Nzg5Mjk0MDgsImV4cCI6MTU3ODkzMTIwOH0.MsLBnzO4i-vrucUyOq1q_iRT414m8j9P9VlZmwgt4u8",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxYmNhMmRlOS0wZTc3LTViNmUtODA0NS04OTU1Y2UxOGRhZTEiLCJpYXQiOjE1Nzg5Mjk0MDgsImV4cCI6MTU4MDEzOTAwOH0.qWenQ6eLof9qn0V_EnBfLURZZYNCJb7FG4Oc5vAL1po"
}
```

## `GET /me`

### Request Header
- Authorization: `Bearer ${accessToken}`

### Response
- type: `User`
```json
{
    "id": "1bca2de9-0e77-5b6e-8045-8955ce18dae1",
    "username": "ray",
    "nickname": "Sylvia Ray"
}
```
