// Chart.js configurations and utilities
window.ChartUtils = {
  // Common chart options
  getCommonOptions: function() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      }
    };
  },

  // Create spending pie chart
  createSpendingChart: function() {
    const ctx = document.getElementById('spending-chart');
    if (!ctx) return;

    const data = window.FinanceData.spendingData;
    
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: data.map(item => item.category),
        datasets: [{
          data: data.map(item => item.amount),
          backgroundColor: data.map(item => item.color),
          borderWidth: 0,
          cutout: '60%'
        }]
      },
      options: {
        ...this.getCommonOptions(),
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.label + ': ' + window.Utils.formatCurrency(context.parsed);
              }
            }
          }
        }
      }
    });

    // Create legend
    this.createSpendingLegend();
  },

  // Create spending legend
  createSpendingLegend: function() {
    const legendContainer = document.getElementById('spending-legend');
    if (!legendContainer) return;

    const data = window.FinanceData.spendingData;
    legendContainer.innerHTML = '';

    data.forEach(item => {
      const legendItem = document.createElement('div');
      legendItem.className = 'legend-item';
      legendItem.innerHTML = `
        <div class="legend-color" style="background-color: ${item.color}"></div>
        <span>${item.category}</span>
      `;
      legendContainer.appendChild(legendItem);
    });
  },

  // Create income vs expenses trend chart
  createTrendsChart: function() {
    const ctx = document.getElementById('trends-chart');
    if (!ctx) return;

    const data = window.FinanceData.monthlyTrends;
    
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(item => item.month),
        datasets: [
          {
            label: 'Income',
            data: data.map(item => item.income),
            borderColor: '#22c55e',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            borderWidth: 2,
            fill: false,
            tension: 0.4
          },
          {
            label: 'Expenses',
            data: data.map(item => item.expenses),
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderWidth: 2,
            fill: false,
            tension: 0.4
          }
        ]
      },
      options: {
        ...this.getCommonOptions(),
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + window.Utils.formatCurrency(context.parsed.y);
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: function(value) {
                return window.Utils.formatCurrency(value);
              }
            }
          }
        }
      }
    });
  },

  // Create portfolio performance chart
  createPortfolioChart: function() {
    const ctx = document.getElementById('portfolio-chart');
    if (!ctx) return;

    const data = window.InvestmentData.portfolioPerformance;
    
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(item => item.date),
        datasets: [{
          label: 'Portfolio Value',
          data: data.map(item => item.value),
          borderColor: '#22c55e',
          backgroundColor: function(context) {
            const chart = context.chart;
            const {ctx, chartArea} = chart;
            if (!chartArea) return null;
            
            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, 'rgba(34, 197, 94, 0.3)');
            gradient.addColorStop(1, 'rgba(34, 197, 94, 0.05)');
            return gradient;
          },
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#22c55e',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 4
        }]
      },
      options: {
        ...this.getCommonOptions(),
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return 'Portfolio Value: ' + window.Utils.formatCurrency(context.parsed.y);
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: function(value) {
                return window.Utils.formatCurrency(value);
              }
            }
          }
        }
      }
    });
  },

  // Create portfolio allocation chart
  createAllocationChart: function() {
    const ctx = document.getElementById('allocation-chart');
    if (!ctx) return;

    const data = window.InvestmentData.portfolioAllocation;
    
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: data.map(item => item.sector),
        datasets: [{
          data: data.map(item => item.value),
          backgroundColor: data.map(item => item.color),
          borderWidth: 0,
          cutout: '50%'
        }]
      },
      options: {
        ...this.getCommonOptions(),
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const item = data[context.dataIndex];
                return context.label + ': ' + window.Utils.formatCurrency(context.parsed) + ' (' + item.percentage + '%)';
              }
            }
          }
        }
      }
    });

    // Create allocation legend
    this.createAllocationLegend();
  },

  // Create allocation legend
  createAllocationLegend: function() {
    const legendContainer = document.getElementById('allocation-legend');
    if (!legendContainer) return;

    const data = window.InvestmentData.portfolioAllocation;
    legendContainer.innerHTML = '';

    data.forEach(item => {
      const legendItem = document.createElement('div');
      legendItem.className = 'legend-item';
      legendItem.innerHTML = `
        <div class="legend-color" style="background-color: ${item.color}"></div>
        <span>${item.sector}</span>
        <span style="margin-left: auto; font-weight: 500;">${item.percentage}%</span>
      `;
      legendItem.style.justifyContent = 'space-between';
      legendContainer.appendChild(legendItem);
    });
  },

  // Create mini chart for stock holdings
  createMiniChart: function(canvasId, data, isPositive) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const color = isPositive ? '#22c55e' : '#ef4444';
    
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((_, index) => index),
        datasets: [{
          data: data,
          borderColor: color,
          backgroundColor: 'transparent',
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        },
        scales: {
          x: { display: false },
          y: { display: false }
        },
        elements: {
          point: { radius: 0 }
        }
      }
    });
  },

  // Initialize all charts
  initializeCharts: function() {
    // Finance charts
    this.createSpendingChart();
    this.createTrendsChart();
    
    // Investment charts
    this.createPortfolioChart();
    this.createAllocationChart();
  }
};