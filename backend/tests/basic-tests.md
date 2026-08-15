# Basic Manual Tests

## 1. Auth register
- POST `/api/auth/register`
- Send fullName, email, password
- Expect status 201 and returned user object

## 2. Auth login
- POST `/api/auth/login`
- Send email and password
- Expect status 200 and JWT token

## 3. Categories create and list
- POST `/api/categories` with Bearer token
- Then GET `/api/categories`
- Expect created category in the list

## 4. Transactions create and list
- POST `/api/transactions` with Bearer token
- Then GET `/api/transactions`
- Expect created transaction in the list

## 5. Summary
- GET `/api/transactions/summary`
- Expect totalIncome, totalExpense and balance
