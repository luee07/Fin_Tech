// Main application controller
window.App = {
  
  // Initialize the application
  init: function() {
    this.setupNavigation();
    this.setupEventListeners();
    this.initializeDashboards();
    
    // Show finance dashboard by default
    this.showDashboard('finance');
  },

  // Setup tab navigation
  setupNavigation: function() {
    const navTabs = document.querySelectorAll('.nav-tab');
    
    navTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const tabName = e.currentTarget.getAttribute('data-tab');
        this.switchTab(tabName);
      });
    });
  },

  // Setup event listeners
  setupEventListeners: function() {
    // Finance dashboard events
    const addTransactionBtn = document.querySelector('#finance-dashboard .btn-primary');
    if (addTransactionBtn) {
      addTransactionBtn.addEventListener('click', () => {
        window.FinanceDashboard.handleAddTransaction();
      });
    }

    // Investment dashboard events
    const buyStockBtn = document.querySelector('#investment-dashboard .btn-primary');
    if (buyStockBtn) {
      buyStockBtn.addEventListener('click', () => {
        window.InvestmentDashboard.handleBuyStock();
      });
    }

    const refreshBtn = document.querySelector('#investment-dashboard .btn-outline');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        window.InvestmentDashboard.handleRefresh();
      });
    }

    // Watchlist search functionality
    const watchlistSearch = document.querySelector('.search-input');
    if (watchlistSearch) {
      watchlistSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const symbol = e.target.value.trim();
          if (symbol) {
            window.InvestmentDashboard.handleAddToWatchlist(symbol, `${symbol} Company`);
            e.target.value = '';
          }
        }
      });
    }

    const addToWatchlistBtn = document.querySelector('.watchlist-search .btn');
    if (addToWatchlistBtn) {
      addToWatchlistBtn.addEventListener('click', () => {
        const input = document.querySelector('.search-input');
        const symbol = input.value.trim();
        if (symbol) {
          window.InvestmentDashboard.handleAddToWatchlist(symbol, `${symbol} Company`);
          input.value = '';
        }
      });
    }

    // Handle responsive design
    this.setupResponsiveHandlers();
  },

  // Switch between tabs
  switchTab: function(tabName) {
    // Update nav tabs
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
      if (tab.getAttribute('data-tab') === tabName) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Show corresponding dashboard
    this.showDashboard(tabName);
  },

  // Show specific dashboard
  showDashboard: function(dashboardName) {
    const dashboards = document.querySelectorAll('.dashboard');
    
    dashboards.forEach(dashboard => {
      if (dashboard.id === `${dashboardName}-dashboard`) {
        dashboard.classList.add('active');
        
        // Initialize dashboard if not already done
        if (dashboardName === 'finance' && !dashboard.dataset.initialized) {
          window.FinanceDashboard.init();
          window.ChartUtils.createSpendingChart();
          window.ChartUtils.createTrendsChart();
          dashboard.dataset.initialized = 'true';
        } else if (dashboardName === 'investments' && !dashboard.dataset.initialized) {
          window.InvestmentDashboard.init();
          // Delay chart creation to ensure canvas elements are visible
          setTimeout(() => {
            window.ChartUtils.createPortfolioChart();
            window.ChartUtils.createAllocationChart();
          }, 100);
          dashboard.dataset.initialized = 'true';
          
          // Start price simulation for investments
          setTimeout(() => {
            window.InvestmentDashboard.simulatePriceUpdates();
          }, 2000);
        }
      } else {
        dashboard.classList.remove('active');
      }
    });
  },

  // Initialize both dashboards
  initializeDashboards: function() {
    // Initialize basic data and components
    window.FinanceDashboard.updateMetrics();
    window.InvestmentDashboard.updatePortfolioMetrics();
  },

  // Setup responsive design handlers
  setupResponsiveHandlers: function() {
    let resizeTimer;
    
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        // Re-render charts on resize to maintain responsiveness
        const activeTab = document.querySelector('.nav-tab.active');
        if (activeTab) {
          const tabName = activeTab.getAttribute('data-tab');
          if (tabName === 'finance') {
            window.ChartUtils.createSpendingChart();
            window.ChartUtils.createTrendsChart();
          } else if (tabName === 'investments') {
            window.ChartUtils.createPortfolioChart();
            window.ChartUtils.createAllocationChart();
          }
        }
      }, 250);
    });
  },

  // Handle keyboard shortcuts
  setupKeyboardShortcuts: function() {
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + 1: Switch to Finance tab
      if ((e.ctrlKey || e.metaKey) && e.key === '1') {
        e.preventDefault();
        this.switchTab('finance');
      }
      
      // Ctrl/Cmd + 2: Switch to Investments tab
      if ((e.ctrlKey || e.metaKey) && e.key === '2') {
        e.preventDefault();
        this.switchTab('investments');
      }
      
      // Escape: Close any open modals or inputs
      if (e.key === 'Escape') {
        const activeInput = document.activeElement;
        if (activeInput && activeInput.tagName === 'INPUT') {
          activeInput.blur();
        }
      }
    });
  },

  // Export data functionality (for future use)
  exportData: function(type) {
    let data;
    let filename;
    
    if (type === 'finance') {
      data = window.FinanceData;
      filename = 'finance-data.json';
    } else if (type === 'investments') {
      data = window.InvestmentData;
      filename = 'investment-data.json';
    } else {
      data = { finance: window.FinanceData, investments: window.InvestmentData };
      filename = 'financial-dashboard-data.json';
    }
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = filename;
    link.click();
  },

  // Show loading state
  showLoading: function(element) {
    const loader = document.createElement('div');
    loader.className = 'loading-spinner';
    loader.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    loader.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 100;
    `;
    
    element.style.position = 'relative';
    element.appendChild(loader);
  },

  // Hide loading state
  hideLoading: function(element) {
    const loader = element.querySelector('.loading-spinner');
    if (loader) {
      loader.remove();
    }
  }
};

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  window.App.init();
  window.App.setupKeyboardShortcuts();
});

// Handle visibility change to pause/resume animations
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    // Page is hidden, pause any animations or updates
    console.log('Dashboard paused');
  } else {
    // Page is visible, resume animations or updates
    console.log('Dashboard resumed');
    
    // Refresh current dashboard
    const activeTab = document.querySelector('.nav-tab.active');
    if (activeTab) {
      const tabName = activeTab.getAttribute('data-tab');
      if (tabName === 'investments') {
        window.InvestmentDashboard.updateTime();
        window.InvestmentDashboard.updatePortfolioMetrics();
      }
    }
  }
});

// Handle online/offline status
window.addEventListener('online', function() {
  console.log('Connection restored');
  // Could refresh data here
});

window.addEventListener('offline', function() {
  console.log('Connection lost');
  // Could show offline indicator here
});