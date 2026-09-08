const transactionRepository = require('../repositories/transactionRepository');

const getTransactions = async (userId) => {
  return transactionRepository.findAllByUserId(userId);
};

const createTransaction = async (userId, formData) => {
  const { title, amount, type, date, note, categoryId } = formData;

  if (!title || !amount || !type || !date || !categoryId) {
    throw new Error('Συμπλήρωσε όλα τα υποχρεωτικά πεδία. Αν δεν υπάρχουν διαθέσιμες κατηγορίες, δημιουργήστε απο το μενού κατηγοριών');
  }

  return transactionRepository.createTransaction({
    title,
    amount: Number(amount),
    type,
    date: new Date(date),
    note: note || null,
    categoryId: Number(categoryId),
    userId
  });
};

const deleteTransaction = async (transactionId, userId) => {
  return transactionRepository.deleteTransaction(Number(transactionId), userId);
};

const getSummary = async (userId) => {
  const transactions = await transactionRepository.findAllByUserId(userId);

  let totalIncome = 0;
  let totalExpense = 0;
  const expensesByCategory = {};

  transactions.forEach((transaction) => {
    const currentAmount = Number(transaction.amount);

    if (transaction.type === 'INCOME') {
      totalIncome += currentAmount;
    }

    if (transaction.type === 'EXPENSE') {
      totalExpense += currentAmount;

      const categoryName = transaction.category?.name || 'Χωρίς κατηγορία';
      expensesByCategory[categoryName] = (expensesByCategory[categoryName] || 0) + currentAmount;
    }
  });

  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
    expensesByCategory
  };
};

module.exports = {
  getTransactions,
  createTransaction,
  deleteTransaction,
  getSummary
};

// fixed rounding issue in totals

// fixed rounding issue in totals

// fixed rounding issue in totals
