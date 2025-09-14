// Finance dashboard functionality
window.FinanceDashboard = {
  
  // Initialize the finance dashboard
  init: function() {
    this.renderBudgetProgress();
    this.renderTransactions();
  },

  // Render budget progress bars
  renderBudgetProgress: function() {
    const container = document.getElementById('budget-list');
    if (!container) return;

    const data = window.FinanceData.spendingData;
    container.innerHTML = '';

    data.forEach(item => {
      const percentage = (item.amount / item.budget) * 100;
      const isOverBudget = percentage > 100;
      
      const budgetItem = document.createElement('div');
      budgetItem.className = 'budget-item';
      
      budgetItem.innerHTML = `
        <div class="budget-header">
          <span class="budget-title">${item.category}</span>
          <div class="budget-amounts">
            <span>${window.Utils.formatCurrency(item.amount)} / ${window.Utils.formatCurrency(item.budget)}</span>
            ${isOverBudget ? '<span class="budget-badge">Over</span>' : ''}
          </div>
        </div>
        <div class="progress-bar">
          <div class="progress-fill ${isOverBudget ? 'over-budget' : ''}" 
               style="width: ${Math.min(percentage, 100)}%"></div>
        </div>
      `;
      
      container.appendChild(budgetItem);
    });
  },

  // Render recent transactions
  renderTransactions: function() {
    const container = document.getElementById('transactions-list');
    if (!container) return;

    const data = window.FinanceData.recentTransactions;
    container.innerHTML = '';

    data.forEach(transaction => {
      const transactionItem = document.createElement('div');
      transactionItem.className = 'transaction-item';
      
      const changeClass = window.Utils.getChangeClass(transaction.amount);
      const formattedAmount = window.Utils.formatCurrency(Math.abs(transaction.amount));
      const sign = transaction.type === 'income' ? '+' : '';
      
      transactionItem.innerHTML = `
        <div class="transaction-details">
          <div class="transaction-header">
            <span class="transaction-description">${transaction.description}</span>
            <span class="transaction-badge">${transaction.category}</span>
          </div>
          <span class="transaction-date">${window.Utils.formatDate(transaction.date)}</span>
        </div>
        <span class="transaction-amount ${changeClass}">
          ${sign}${formattedAmount}
        </span>
      `;
      
      container.appendChild(transactionItem);
    });
  },

  // Calculate financial metrics
  calculateMetrics: function() {
    const trends = window.FinanceData.monthlyTrends;
    const latestMonth = trends[trends.length - 1];
    
    return {
      totalIncome: latestMonth.income,
      totalExpenses: latestMonth.expenses,
      netSavings: latestMonth.income - latestMonth.expenses,
      savingsRate: ((latestMonth.income - latestMonth.expenses) / latestMonth.income) * 100
    };
  },

  // Update metrics display
  updateMetrics: function() {
    const metrics = this.calculateMetrics();
    
    // Update total balance
    const balanceElement = document.querySelector('.metric-card:first-child .metric-value');
    if (balanceElement) {
      balanceElement.textContent = window.Utils.formatCurrency(metrics.netSavings);
    }
    
    // Update monthly income
    const incomeElement = document.querySelector('.metric-card:nth-child(2) .metric-value');
    if (incomeElement) {
      incomeElement.textContent = window.Utils.formatCurrency(metrics.totalIncome);
    }
    
    // Update monthly expenses
    const expensesElement = document.querySelector('.metric-card:nth-child(3) .metric-value');
    if (expensesElement) {
      expensesElement.textContent = window.Utils.formatCurrency(metrics.totalExpenses);
    }
    
    // Update savings rate
    const savingsElement = document.querySelector('.metric-card:nth-child(4) .metric-value');
    if (savingsElement) {
      savingsElement.textContent = window.Utils.formatPercent(metrics.savingsRate);
    }
  },

  // Add new transaction (placeholder function)
  addTransaction: function(description, amount, category, type) {
    const newTransaction = {
      id: Date.now(),
      description: description,
      amount: type === 'expense' ? -Math.abs(amount) : Math.abs(amount),
      category: category,
      date: new Date().toISOString().split('T')[0],
      type: type
    };
    
    window.FinanceData.recentTransactions.unshift(newTransaction);
    
    // Keep only the latest 5 transactions for display
    if (window.FinanceData.recentTransactions.length > 5) {
      window.FinanceData.recentTransactions = window.FinanceData.recentTransactions.slice(0, 5);
    }
    
    this.renderTransactions();
    this.updateMetrics();
  },

  // Handle add transaction button click
  handleAddTransaction: function() {
    // This would typically open a modal or form
    // For demo purposes, we'll add a sample transaction
    const sampleTransactions = [
      { description: 'Coffee Shop', amount: 12.50, category: 'Food & Dining', type: 'expense' },
      { description: 'Bonus Payment', amount: 500.00, category: 'Income', type: 'income' },
      { description: 'Uber Ride', amount: 18.75, category: 'Transportation', type: 'expense' },
      { description: 'Gym Membership', amount: 45.00, category: 'Healthcare', type: 'expense' }
    ];
    
    const randomTransaction = sampleTransactions[Math.floor(Math.random() * sampleTransactions.length)];
    this.addTransaction(
      randomTransaction.description,
      randomTransaction.amount,
      randomTransaction.category,
      randomTransaction.type
    );
    
    // Show a simple feedback
    this.showNotification('Transaction added successfully!');
  },

  // Show notification (simple implementation)
  showNotification: function(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--success);
      color: white;
      padding: 12px 20px;
      border-radius: var(--radius);
      z-index: 1000;
      font-size: 14px;
      font-weight: 500;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
};