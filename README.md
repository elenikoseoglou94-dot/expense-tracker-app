# Expense Tracker App

## Docker setup

The easiest and supported way to run the application is with Docker Compose.

### Prerequisites

- Docker Desktop installed and running
- Ports `3306`, `4000`, and `5173` available on your machine

### Run from scratch

From the project root, run:

```bash
docker compose down -v
docker compose up --build
```

This starts three services defined in `docker-compose.yml`:
- `mysql` on port `3306`
- `backend` on port `4000`
- `frontend` on port `5173`

The backend waits for MySQL to become healthy and then applies the Prisma schema automatically on startup, so you do **not** need to run `npx prisma db push` manually when using Docker.

### URLs

After startup, open:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:4000`
- Swagger UI: `http://localhost:4000/api-docs-ui`
- OpenAPI JSON: `http://localhost:4000/api-docs`

### Stop the app

```bash
docker compose down
```

To also remove the MySQL volume and start again with a clean database:

```bash
docker compose down -v
```

### Troubleshooting

- If Docker says a port is already in use, stop the local service using that port and run `docker compose up --build` again.
- If the frontend build fails with a missing `nginx.conf`, make sure the file `frontend/nginx.conf` exists in the repository.
- If you changed dependencies or Dockerfiles, rebuild with `docker compose up --build`.

## Project overview

The Expense Tracker App is a full-stack web application for tracking personal income and expenses. Users can register, sign in, manage their own categories, create transactions, and view a simple dashboard summary.

## Σκοπός της εφαρμογής

Η εφαρμογή έχει σκοπό να προσφέρει ένα απλό UI για:
- καταγραφή εσόδων και εξόδων
- οργάνωση κινήσεων ανά κατηγορία
- προσθήκη κατηγορίες της επιλογής του χρήστη
- προβολή συνολικής εικόνας των οικονομικών δεδομένων

## Τεχνολογίες

### Backend
- Node.js
- Express.js
- Prisma ORM
- JWT Authentication
- bcryptjs

### Frontend
- React
- Vite
- React Router

### Βάση δεδομένων
- MySQL

## Βασικές λειτουργίες
- Εγγραφή και σύνδεση χρήστη
- Public/Private routes
- Δημιουργία και Διαγραφή κατηγορίας
- Δημιουργία και Διαγραφή κίνησης
- Dashboard με βασική σύνοψη
- OpenAPI JSON endpoint
- Απλή σελίδα Swagger UI

## Domain Model

### User
Ο χρήστης δημιουργεί λογαριασμό και συνδέεται στην εφαρμογή. Κάθε χρήστης έχει τις δικές του κατηγορίες και τις δικές του συναλλαγές.

### Category
Η κατηγορία ανήκει σε έναν χρήστη και χρησιμοποιείται για την οργάνωση των συναλλαγών. Κάθε κατηγορία έχει όνομα και τύπο, ο οποίος μπορεί να είναι:
- INCOME
- EXPENSE

### Transaction
Η συναλλαγή ανήκει σε έναν χρήστη και σε μία κατηγορία. Περιλαμβάνει τίτλο, ποσό, τύπο, ημερομηνία και προαιρετική σημείωση.

### TransactionType
Το `TransactionType` είναι enum του domain model και χρησιμοποιείται ώστε τόσο οι κατηγορίες όσο και οι συναλλαγές να χαρακτηρίζονται σταθερά ως `INCOME` ή `EXPENSE`.

## Σχέσεις οντοτήτων

- Ένας `User` έχει πολλές `Category`
- Ένας `User` έχει πολλές `Transaction`
- Μία `Category` ανήκει σε έναν `User`
- Μία `Category` μπορεί να συνδέεται με πολλές `Transaction`
- Μία `Transaction` ανήκει σε έναν `User`
- Μία `Transaction` ανήκει σε μία `Category`

## Μοντέλο δεδομένων

Η εφαρμογή βασίζεται σε τρεις βασικές οντότητες.

### User
Ο χρήστης μπορεί να δημιουργήσει λογαριασμό και να συνδεθεί στην εφαρμογή. Κάθε χρήστης έχει δικές του κατηγορίες και δικές του κινήσεις

### Category
Η κατηγορία ανήκει σε έναν χρήστη και χρησιμοποιείται για την οργάνωση των κινήσεων. Κάθε κατηγορία έχει τύπο:
- INCOME
- EXPENSE

### Transaction
Η κίνηση ανήκει σε έναν χρήστη και σε μία κατηγορία. Περιλαμβάνει:
- τίτλο
- ποσό
- τύπο
- ημερομηνία
- προαιρετική σημείωση

## Ρύθμιση βάσης δεδομένων

Η εφαρμογή χρησιμοποιεί MySQL.

Δημιουργία βάσης και χρήστη:

```sql
CREATE DATABASE IF NOT EXISTS expense_tracker_db;
CREATE USER IF NOT EXISTS 'expense_user'@'localhost' IDENTIFIED BY 'expense_pass_123';
GRANT ALL PRIVILEGES ON expense_tracker_db.* TO 'expense_user'@'localhost';
FLUSH PRIVILEGES;
```

## Μεταβλητές περιβάλλοντος

Xρησιμοποιήθηκε για να δηλωθούν τα JWT_SECRET και DATABASE_URL τα οποία δεν θέλουμε να υπάρχουν στον κωδικά μας για λόγους ασφαλείας.
Δημιούργησε ένα αρχείο `.env` μέσα στον φάκελο `backend`.

Παράδειγμα:

```env
DATABASE_URL="mysql://expense_user:expense_pass_123@localhost:3306/expense_tracker_db"
JWT_SECRET="my-super-secret-key"
```

## Εκκίνηση backend

Άνοιξε ένα terminal και εκτέλεσε:

```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run dev
```

Το backend εκτελείται στο:

```text
http://localhost:4000
```

## Εκκίνηση frontend

Άνοιξε δεύτερο terminal και εκτέλεσε:

```bash
cd frontend
npm install
npm run dev
```

Το frontend συνήθως εκτελείται στο:

```text
http://localhost:5173
```

## API endpoints

### Health
- `GET /api/health`

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Categories
- `GET /api/categories`
- `POST /api/categories`
- `DELETE /api/categories/:id`

### Transactions
- `GET /api/transactions`
- `POST /api/transactions`
- `DELETE /api/transactions/:id`
- `GET /api/transactions/summary`

## Τεκμηρίωση API

OpenAPI JSON endpoint:

```text
http://localhost:4000/api-docs
```

Swagger UI page:

```text
http://localhost:4000/api-docs-ui
```

## Τρόπος χρήσης

1. Δημιούργησε νέο λογαριασμό.
2. Κάνε σύνδεση.
3. Πρόσθεσε μία ή περισσότερες κατηγορίες.
4. Καταχώρισε κινήσεις χρησιμοποιώντας τις κατηγορίες.
5. Δες τη σύνοψη στο dashboard.
6. Δες την αναφορά στη σελίδα report.

Η εφαρμογή έχει υλοποιηθεί με απλή λογική. Περιλαμβάνει τις βασικές λειτουργίες που χρειάζονται για τη διαχείριση των οικονομικών δεδομένων του χρήστη.

## Γιατί χρησιμοποιήθηκε Prisma

Στο backend, χρησιμοποιήθηκε το Prisma ως εργαλείο για επικοινωνια με τη βάση δεδομένων MySQL. Αυτό κάνει τη διαχείριση της βάσης πολύ πιο εύκολη και βοηθά σε πιο οργανωμένο κώδικα. Με αυτόν τον τρόπο, δεν χρειάστηκε να γράφουμε συνεχώς SQL queries.
## Testing

Υπάρχει αρχείο:

```text
backend/tests/basic-tests.md
```

Το αρχείο εχει βασική κάλυψη όπως:
- εγγραφή χρήστη,
- σύνδεση,
- έλεγχος προστατευμένων endpoints,
- δημιουργία και λίστα κατηγοριών,
- δημιουργία και λίστα κινήσεων,
- έλεγχο της σύνοψης.

## Αρχιτεκτονική backend

Το backend ακολουθεί layered αρχιτεκτονική:
- routes για την είσοδο των HTTP requests,
- controllers για διαχείριση request/response,
- services για business logic,
- repositories για πρόσβαση στη βάση μέσω Prisma.


## Πιθανές μελλοντικές βελτιώσεις
- φίλτρα ανά ημερομηνία και κατηγορια
- γραφήματα στο dashboard με καποια βιβλιοθήκη οπως chart.js
- περισσότερα tests
- export δεδομένων σε pdf/csv
- προσθηκη profile, settings

## Build and Deploy

See docker-compose.yml for local setup instructions.

## Build and Deploy

See docker-compose.yml for local setup instructions.
