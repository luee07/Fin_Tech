// Sample data for the financial dashboard
window.FinanceData = {
  // Spending data for pie chart
  spendingData: [
    { category: 'Food & Dining', amount: 1250, budget: 1500, color: '#0088FE' },
    { category: 'Transportation', amount: 850, budget: 1000, color: '#00C49F' },
    { category: 'Shopping', amount: 650, budget: 800, color: '#FFBB28' },
    { category: 'Entertainment', amount: 450, budget: 600, color: '#FF8042' },
    { category: 'Bills & Utilities', amount: 1200, budget: 1200, color: '#8884D8' },
    { category: 'Healthcare', amount: 320, budget: 500, color: '#82CA9D' },
  ],

  // Monthly trends for line chart
  monthlyTrends: [
    { month: 'Jan', income: 6500, expenses: 4200 },
    { month: 'Feb', income: 6800, expenses: 4500 },
    { month: 'Mar', income: 6500, expenses: 4100 },
    { month: 'Apr', income: 7200, expenses: 4800 },
    { month: 'May', income: 6900, expenses: 4650 },
    { month: 'Jun', income: 7100, expenses: 4720 },
  ],

  // Recent transactions
  recentTransactions: [
    { id: 1, description: 'Grocery Store', amount: -89.50, category: 'Food & Dining', date: '2025-09-13', type: 'expense' },
    { id: 2, description: 'Salary Deposit', amount: 3200.00, category: 'Income', date: '2025-09-12', type: 'income' },
    { id: 3, description: 'Gas Station', amount: -45.20, category: 'Transportation', date: '2025-09-12', type: 'expense' },
    { id: 4, description: 'Netflix Subscription', amount: -15.99, category: 'Entertainment', date: '2025-09-11', type: 'expense' },
    { id: 5, description: 'Freelance Payment', amount: 850.00, category: 'Income', date: '2025-09-10', type: 'income' },
  ]
};

// Sample data for the investment dashboard
window.InvestmentData = {
  // Portfolio allocation for pie chart
  portfolioAllocation: [
    { sector: 'Technology', value: 45000, percentage: 35, color: '#0088FE' },
    { sector: 'Healthcare', value: 32000, percentage: 25, color: '#00C49F' },
    { sector: 'Finance', value: 25600, percentage: 20, color: '#FFBB28' },
    { sector: 'Energy', value: 16000, percentage: 12.5, color: '#FF8042' },
    { sector: 'Real Estate', value: 9600, percentage: 7.5, color: '#8884D8' },
  ],

  // Stock holdings
  stockHoldings: [
    { 
      symbol: 'AAPL', 
      name: 'Apple Inc.', 
      shares: 50, 
      currentPrice: 178.45, 
      avgCost: 165.30, 
      change: 2.35, 
      changePercent: 1.33,
      value: 8922.50,
      dayData: [175, 176.5, 178, 177.2, 178.45]
    },
    { 
      symbol: 'MSFT', 
      name: 'Microsoft Corp.', 
      shares: 30, 
      currentPrice: 332.89, 
      avgCost: 310.25, 
      change: -1.85, 
      changePercent: -0.55,
      value: 9986.70,
      dayData: [335, 334, 332.5, 331, 332.89]
    },
    { 
      symbol: 'GOOGL', 
      name: 'Alphabet Inc.', 
      shares: 25, 
      currentPrice: 135.67, 
      avgCost: 142.80, 
      change: 3.21, 
      changePercent: 2.42,
      value: 3391.75,
      dayData: [132, 133.5, 134.8, 135.1, 135.67]
    },
    { 
      symbol: 'TSLA', 
      name: 'Tesla Inc.', 
      shares: 15, 
      currentPrice: 248.92, 
      avgCost: 267.45, 
      change: -5.67, 
      changePercent: -2.23,
      value: 3733.80,
      dayData: [252, 250, 248, 249.5, 248.92]
    },
    { 
      symbol: 'NVDA', 
      name: 'NVIDIA Corp.', 
      shares: 12, 
      currentPrice: 421.13, 
      avgCost: 385.20, 
      change: 8.45, 
      changePercent: 2.05,
      value: 5053.56,
      dayData: [415, 418, 420, 419, 421.13]
    }
  ],

  // Market indices
  marketIndices: [
    { name: 'S&P 500', value: 4567.89, change: 23.45, changePercent: 0.52 },
    { name: 'NASDAQ', value: 14234.67, change: -45.32, changePercent: -0.32 },
    { name: 'DOW JONES', value: 35678.90, change: 156.78, changePercent: 0.44 },
    { name: 'RUSSELL 2000', value: 1987.65, change: -12.34, changePercent: -0.62 }
  ],

  // Watchlist
  watchlist: [
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 134.56, change: 2.89, changePercent: 2.19 },
    { symbol: 'META', name: 'Meta Platforms Inc.', price: 298.34, change: -4.23, changePercent: -1.40 },
    { symbol: 'NFLX', name: 'Netflix Inc.', price: 445.67, change: 12.45, changePercent: 2.87 },
    { symbol: 'AMD', name: 'Advanced Micro Devices', price: 102.78, change: -1.23, changePercent: -1.18 }
  ],

  // Portfolio performance over time
  portfolioPerformance: [
    { date: '1W', value: 128500 },
    { date: '2W', value: 131200 },
    { date: '3W', value: 129800 },
    { date: '4W', value: 132400 },
    { date: '5W', value: 128900 },
    { date: '6W', value: 134600 },
    { date: 'Now', value: 136788 }
  ]
};

// Utility functions
window.Utils = {
  formatCurrency: function(amount, showSign = false) {
    const formatted = Math.abs(amount).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    
    if (showSign && amount !== 0) {
      return amount > 0 ? `+${formatted}` : `-${formatted}`;
    }
    
    return formatted;
  },

  formatPercent: function(percent, showSign = false) {
    const formatted = Math.abs(percent).toFixed(2) + '%';
    
    if (showSign && percent !== 0) {
      return percent > 0 ? `+${formatted}` : `-${formatted}`;
    }
    
    return formatted;
  },

  formatDate: function(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  },

  getChangeClass: function(value) {
    if (value > 0) return 'positive';
    if (value < 0) return 'negative';
    return '';
  },

  getChangeIcon: function(value) {
    if (value > 0) return 'fas fa-arrow-up';
    if (value < 0) return 'fas fa-arrow-down';
    return '';
  }
};