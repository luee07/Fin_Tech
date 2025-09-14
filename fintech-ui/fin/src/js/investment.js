// Investment dashboard functionality
window.InvestmentDashboard = {
  
  // Initialize the investment dashboard
  init: function() {
    this.renderMarketIndices();
    this.renderStockHoldings();
    this.renderWatchlist();
    this.updateTime();
    this.startTimeUpdater();
  },

  // Render market indices
  renderMarketIndices: function() {
    const container = document.getElementById('market-indices');
    if (!container) return;

    const data = window.InvestmentData.marketIndices;
    container.innerHTML = '';

    data.forEach(index => {
      const changeClass = window.Utils.getChangeClass(index.change);
      const changeIcon = window.Utils.getChangeIcon(index.change);
      
      const indexItem = document.createElement('div');
      indexItem.className = 'index-item';
      
      indexItem.innerHTML = `
        <div class="index-header">
          <div>
            <h4 class="index-name">${index.name}</h4>
            <div class="index-value">${index.value.toLocaleString()}</div>
          </div>
          <div class="index-change ${changeClass}">
            <div class="index-change-value">
              ${changeIcon ? `<i class="${changeIcon}"></i>` : ''}
              ${window.Utils.formatCurrency(Math.abs(index.change), true)}
            </div>
            <div class="index-change-percent">
              (${window.Utils.formatPercent(index.changePercent, true)})
            </div>
          </div>
        </div>
      `;
      
      container.appendChild(indexItem);
    });
  },

  // Render stock holdings
  renderStockHoldings: function() {
    const container = document.getElementById('holdings-list');
    if (!container) return;

    const data = window.InvestmentData.stockHoldings;
    container.innerHTML = '';

    data.forEach((stock, index) => {
      const changeClass = window.Utils.getChangeClass(stock.change);
      const changeIcon = window.Utils.getChangeIcon(stock.change);
      const chartId = `mini-chart-${index}`;
      
      const holdingItem = document.createElement('div');
      holdingItem.className = 'holding-item';
      
      holdingItem.innerHTML = `
        <div class="holding-info">
          <div>
            <div class="holding-symbol">
              ${stock.symbol}
              <span class="holding-shares">${stock.shares} shares</span>
            </div>
            <div class="holding-name">${stock.name}</div>
          </div>
        </div>
        <div class="holding-chart">
          <canvas id="${chartId}" width="60" height="30"></canvas>
        </div>
        <div class="holding-price">
          <div class="holding-current-price">${window.Utils.formatCurrency(stock.currentPrice)}</div>
          <div class="holding-change ${changeClass}">
            ${changeIcon ? `<i class="${changeIcon}"></i>` : ''}
            ${window.Utils.formatCurrency(Math.abs(stock.change), true)} 
            (${window.Utils.formatPercent(stock.changePercent, true)})
          </div>
        </div>
        <div class="holding-value">
          <div class="holding-total-value">${window.Utils.formatCurrency(stock.value)}</div>
          <div class="holding-value-label">Value</div>
        </div>
      `;
      
      container.appendChild(holdingItem);
      
      // Create mini chart after the element is added to DOM
      setTimeout(() => {
        window.ChartUtils.createMiniChart(chartId, stock.dayData, stock.change >= 0);
      }, 100);
    });
  },

  // Render watchlist
  renderWatchlist: function() {
    const container = document.getElementById('watchlist-list');
    if (!container) return;

    const data = window.InvestmentData.watchlist;
    container.innerHTML = '';

    data.forEach(stock => {
      const changeClass = window.Utils.getChangeClass(stock.change);
      const changeIcon = window.Utils.getChangeIcon(stock.change);
      
      const watchlistItem = document.createElement('div');
      watchlistItem.className = 'watchlist-item';
      
      watchlistItem.innerHTML = `
        <div class="watchlist-info">
          <i class="fas fa-star watchlist-star"></i>
          <div>
            <div class="watchlist-symbol">${stock.symbol}</div>
            <div class="watchlist-name">${stock.name}</div>
          </div>
        </div>
        <div class="watchlist-price">
          <div class="watchlist-current-price">${window.Utils.formatCurrency(stock.price)}</div>
          <div class="watchlist-change ${changeClass}">
            ${changeIcon ? `<i class="${changeIcon}"></i>` : ''}
            ${window.Utils.formatCurrency(Math.abs(stock.change), true)} 
            (${window.Utils.formatPercent(stock.changePercent, true)})
          </div>
        </div>
      `;
      
      container.appendChild(watchlistItem);
    });
  },

  // Update current time
  updateTime: function() {
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
      const now = new Date();
      timeElement.textContent = now.toLocaleTimeString();
    }
  },

  // Start time updater
  startTimeUpdater: function() {
    setInterval(() => {
      this.updateTime();
    }, 1000);
  },

  // Calculate portfolio metrics
  calculatePortfolioMetrics: function() {
    const holdings = window.InvestmentData.stockHoldings;
    
    const totalValue = holdings.reduce((sum, stock) => sum + stock.value, 0);
    const totalCost = holdings.reduce((sum, stock) => sum + (stock.avgCost * stock.shares), 0);
    const totalGainLoss = totalValue - totalCost;
    const totalGainLossPercent = (totalGainLoss / totalCost) * 100;
    
    const dayGainLoss = holdings.reduce((sum, stock) => {
      return sum + (stock.change * stock.shares);
    }, 0);
    const dayGainLossPercent = (dayGainLoss / totalValue) * 100;
    
    return {
      totalValue,
      totalGainLoss,
      totalGainLossPercent,
      dayGainLoss,
      dayGainLossPercent
    };
  },

  // Update portfolio metrics display
  updatePortfolioMetrics: function() {
    const metrics = this.calculatePortfolioMetrics();
    
    // Update portfolio value
    const valueElement = document.querySelector('#investment-dashboard .metric-card:first-child .metric-value');
    if (valueElement) {
      valueElement.textContent = window.Utils.formatCurrency(metrics.totalValue);
    }
    
    // Update total gain/loss
    const gainLossElement = document.querySelector('#investment-dashboard .metric-card:first-child .metric-change');
    if (gainLossElement) {
      const changeClass = window.Utils.getChangeClass(metrics.totalGainLoss);
      const changeIcon = window.Utils.getChangeIcon(metrics.totalGainLoss);
      gainLossElement.className = `metric-change ${changeClass}`;
      gainLossElement.innerHTML = `
        ${changeIcon ? `<i class="${changeIcon}"></i>` : ''}
        ${window.Utils.formatCurrency(Math.abs(metrics.totalGainLoss), true)} 
        (${window.Utils.formatPercent(metrics.totalGainLossPercent, true)})
      `;
    }
    
    // Update day's gain/loss
    const dayGainElement = document.querySelector('#investment-dashboard .metric-card:nth-child(2) .metric-value');
    if (dayGainElement) {
      const changeClass = window.Utils.getChangeClass(metrics.dayGainLoss);
      dayGainElement.className = `metric-value ${changeClass}`;
      dayGainElement.textContent = window.Utils.formatCurrency(metrics.dayGainLoss, true);
    }
  },

  // Simulate real-time price updates
  simulatePriceUpdates: function() {
    setInterval(() => {
      const holdings = window.InvestmentData.stockHoldings;
      const indices = window.InvestmentData.marketIndices;
      const watchlist = window.InvestmentData.watchlist;
      
      // Update stock holdings prices (small random changes)
      holdings.forEach(stock => {
        const changePercent = (Math.random() - 0.5) * 0.02; // ±1% max change
        const newPrice = stock.currentPrice * (1 + changePercent);
        const priceChange = newPrice - stock.currentPrice;
        
        stock.currentPrice = newPrice;
        stock.change = priceChange;
        stock.changePercent = (priceChange / (newPrice - priceChange)) * 100;
        stock.value = stock.currentPrice * stock.shares;
        
        // Update day data for mini charts
        stock.dayData.shift();
        stock.dayData.push(newPrice);
      });
      
      // Update market indices
      indices.forEach(index => {
        const changePercent = (Math.random() - 0.5) * 0.01; // ±0.5% max change
        const newValue = index.value * (1 + changePercent);
        const valueChange = newValue - index.value;
        
        index.value = newValue;
        index.change = valueChange;
        index.changePercent = (valueChange / (newValue - valueChange)) * 100;
      });
      
      // Update watchlist
      watchlist.forEach(stock => {
        const changePercent = (Math.random() - 0.5) * 0.02; // ±1% max change
        const newPrice = stock.price * (1 + changePercent);
        const priceChange = newPrice - stock.price;
        
        stock.price = newPrice;
        stock.change = priceChange;
        stock.changePercent = (priceChange / (newPrice - priceChange)) * 100;
      });
      
      // Re-render components
      this.renderMarketIndices();
      this.renderStockHoldings();
      this.renderWatchlist();
      this.updatePortfolioMetrics();
      
    }, 5000); // Update every 5 seconds
  },

  // Handle buy stock button click
  handleBuyStock: function() {
    // This would typically open a trading modal
    // For demo purposes, we'll show a simple notification
    this.showNotification('Trading interface would open here');
  },

  // Handle refresh button click
  handleRefresh: function() {
    this.renderMarketIndices();
    this.renderStockHoldings();
    this.renderWatchlist();
    this.updatePortfolioMetrics();
    this.showNotification('Market data refreshed');
  },

  // Handle add to watchlist
  handleAddToWatchlist: function(symbol, name, price) {
    const newStock = {
      symbol: symbol.toUpperCase(),
      name: name,
      price: price || Math.random() * 500 + 50, // Random price if not provided
      change: (Math.random() - 0.5) * 10,
      changePercent: (Math.random() - 0.5) * 5
    };
    
    window.InvestmentData.watchlist.unshift(newStock);
    this.renderWatchlist();
    this.showNotification(`${symbol.toUpperCase()} added to watchlist`);
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