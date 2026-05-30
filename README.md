Users
id, name, email, password_hash, created_at
Categories
id, name, type (income/expense), user_id (NULL = global)
Transactions
id, user_id, category_id, amount, type, date, description, created_at
INDEX: user_id, date, category_id

## 🚀 How to Run

### Prerequisites
- Docker Desktop installed (that's it!)

### Steps

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd expense-tracker

# 2. Run everything
docker-compose up --build

# 3. Open browser
http://localhost:3000
```

## 🔑 Test Credentials

After registering, use:
- Email: test@test.com
- Password: 123456

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register |
| POST | /api/auth/login | Login |
| GET | /api/categories | Get categories |
| POST | /api/categories | Create category |
| GET | /api/transactions | Get all (filter + paginate) |
| POST | /api/transactions | Create transaction |
| PUT | /api/transactions/:id | Update transaction |
| DELETE | /api/transactions/:id | Delete transaction |
| GET | /api/transactions/summary/dashboard | Monthly totals |
| GET | /api/transactions/summary/monthly | Category breakdown |