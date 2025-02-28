document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseName = document.getElementById('expense-name');
    const expenseAmount = document.getElementById('expense-amount');
    const expenseCategory = document.getElementById('expense-category');
    const expenseList = document.getElementById('expense-list');
    const totalAmountElement = document.getElementById('total-amount');
  
    let totalExpenses = 0;
    loadExpenses();
    expenseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = expenseName.value.trim();
      const amount = parseFloat(expenseAmount.value.trim());
      const category = expenseCategory.value;
  
      if (name && amount) {
        addExpense(name, amount, category);
        expenseName.value = '';
        expenseAmount.value = '';
        saveExpenses();
      }
    });
    expenseList.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) {
        const expenseItem = e.target.parentElement;
        const amount = parseFloat(expenseItem.querySelector('span').textContent);
        totalExpenses -= amount;
        updateTotalExpenses();
        expenseItem.remove();
        saveExpenses();
      }
    });
    function addExpense(name, amount, category) {
      const expenseItem = document.createElement('div');
      expenseItem.classList.add('expense-item');
      expenseItem.innerHTML = `
        <span>${name} (${category}): $${amount.toFixed(2)}</span>
        <button class="delete-btn">Delete</button>
      `;
      expenseList.appendChild(expenseItem);
  
      totalExpenses += amount;
      updateTotalExpenses();
    }
    function updateTotalExpenses() {
      totalAmountElement.textContent = totalExpenses.toFixed(2);
    }
    function saveExpenses() {
      const expenses = [];
      document.querySelectorAll('.expense-item').forEach((item) => {
        const name = item.querySelector('span').textContent.split(' (')[0];
        const amount = parseFloat(item.querySelector('span').textContent.split('$')[1]);
        const category = item.querySelector('span').textContent.split(' (')[1].split(')')[0];
        expenses.push({ name, amount, category });
      });
      localStorage.setItem('expenses', JSON.stringify(expenses));
      localStorage.setItem('totalExpenses', totalExpenses);
    }
    function loadExpenses() {
      const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
      totalExpenses = parseFloat(localStorage.getItem('totalExpenses')) || 0;
      expenses.forEach((expense) => {
        addExpense(expense.name, expense.amount, expense.category);
      });
      updateTotalExpenses();
    }
  });