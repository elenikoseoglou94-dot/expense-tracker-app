# Expense Tracker App

## Build και deploy

Η εφαρμογή μπορεί να γίνει build και να τρέξει είτε τοπικά χωρίς Docker είτε με Docker Compose. Για τοπική εκτέλεση, απαιτούνται MySQL, backend και frontend.

### Τοπική εκτέλεση

1. Δημιούργησε τη βάση δεδομένων MySQL με το όνομα `expense_tracker_db` και τον χρήστη `expense_user`.
2. Δημιούργησε αρχείο `.env` μέσα στον φάκελο `backend` και πρόσθεσε τα `DATABASE_URL` και `JWT_SECRET`.
3. Άνοιξε ένα terminal, πήγαινε στο `backend` και εκτέλεσε:

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

4. Άνοιξε δεύτερο terminal, πήγαινε στο `frontend` και εκτέλεσε:

```bash
npm install
npm run dev
```

5. Το backend τρέχει στο `http://localhost:4000` και το frontend συνήθως στο `http://localhost:5173`.

### Εκτέλεση και deploy με Docker

Η εφαρμογή υποστηρίζει και Docker-based εκτέλεση μέσω `docker-compose.yml`, ώστε frontend, backend και MySQL να σηκώνονται μαζί σαν ξεχωριστά services.

Από τον κεντρικό φάκελο του project εκτέλεσε:

```bash
docker compose up --build
```

Η εντολή αυτή:
- κάνει build τα images του frontend και του backend
- σηκώνει MySQL database, backend API και frontend app
- εφαρμόζει το Prisma schema στη βάση μέσω του backend container

Μετά την εκκίνηση:
- frontend: `http://localhost:5173`
- backend: `http://localhost:4000`
- Swagger UI: `http://localhost:4000/api-docs-ui`

Για εκτέλεση στο background:

```bash
docker compose up --build -d
```

Για τερματισμό:

```bash
docker compose down
```

Για πλήρη καθαρισμό μαζί με τον όγκο της βάσης:

```bash
docker compose down -v
```

### Deploy προσέγγιση

Η ίδια Docker-based δομή μπορεί να χρησιμοποιηθεί και για deploy σε περιβάλλον που υποστηρίζει containers. Σε production περιβάλλον μπορούν να γίνουν deploy ξεχωριστά το frontend, το backend και η MySQL database, ή να χρησιμοποιηθεί container platform που διαβάζει το ίδιο setup και τα αντίστοιχα environment variables.

Το Expense Tracker App είναι μια fullstack web εφαρμογή για την καταγραφή και παρακολούθηση προσωπικών εσόδων και εξόδων. Ο χρήστης μπορεί να δημιουργήσει λογαριασμό, να συνδεθεί, να οργανώσει τις κατηγορίες του, να καταχωρίσει κινήσεις και να δει συνοπτικά τα οικονομικά του στοιχεία.

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
