import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Eye, Plus, Search, Star, Activity, BarChart3, PieChart as PieChartIcon, RefreshCw } from 'lucide-react';
import { Input } from "./ui/input";
import { useState, useEffect } from "react";

const portfolioAllocation = [
  { sector: 'Technology', value: 45000, percentage: 35, color: '#0088FE' },
  { sector: 'Healthcare', value: 32000, percentage: 25, color: '#00C49F' },
  { sector: 'Finance', value: 25600, percentage: 20, color: '#FFBB28' },
  { sector: 'Energy', value: 16000, percentage: 12.5, color: '#FF8042' },
  { sector: 'Real Estate', value: 9600, percentage: 7.5, color: '#8884D8' },
];

const stockHoldings = [
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
];

const marketIndices = [
  { name: 'S&P 500', value: 4567.89, change: 23.45, changePercent: 0.52 },
  { name: 'NASDAQ', value: 14234.67, change: -45.32, changePercent: -0.32 },
  { name: 'DOW JONES', value: 35678.90, change: 156.78, changePercent: 0.44 },
  { name: 'RUSSELL 2000', value: 1987.65, change: -12.34, changePercent: -0.62 }
];

const watchlist = [
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 134.56, change: 2.89, changePercent: 2.19 },
  { symbol: 'META', name: 'Meta Platforms Inc.', price: 298.34, change: -4.23, changePercent: -1.40 },
  { symbol: 'NFLX', name: 'Netflix Inc.', price: 445.67, change: 12.45, changePercent: 2.87 },
  { symbol: 'AMD', name: 'Advanced Micro Devices', price: 102.78, change: -1.23, changePercent: -1.18 }
];

const portfolioPerformance = [
  { date: '1W', value: 128500 },
  { date: '2W', value: 131200 },
  { date: '3W', value: 129800 },
  { date: '4W', value: 132400 },
  { date: '5W', value: 128900 },
  { date: '6W', value: 134600 },
  { date: 'Now', value: 136788 }
];

export function InvestmentDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMarketOpen, setIsMarketOpen] = useState(true);
  
  const totalPortfolioValue = stockHoldings.reduce((sum, stock) => sum + stock.value, 0);
  const totalGainLoss = stockHoldings.reduce((sum, stock) => {
    const gain = (stock.currentPrice - stock.avgCost) * stock.shares;
    return sum + gain;
  }, 0);
  const totalGainLossPercent = (totalGainLoss / (totalPortfolioValue - totalGainLoss)) * 100;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const MiniChart = ({ data }: { data: number[] }) => (
    <ResponsiveContainer width={60} height={30}>
      <LineChart data={data.map((value, index) => ({ value, index }))}>
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={data[data.length - 1] > data[0] ? "#22c55e" : "#ef4444"} 
          strokeWidth={2} 
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Investment Portfolio</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <p>Real-time market data</p>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isMarketOpen ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm">{isMarketOpen ? 'Market Open' : 'Market Closed'}</span>
              </div>
              <span className="text-sm">{currentTime.toLocaleTimeString()}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Buy Stock
            </Button>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalPortfolioValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className={`flex items-center ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {totalGainLoss >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  {totalGainLoss >= 0 ? '+' : ''}${totalGainLoss.toFixed(2)} ({totalGainLossPercent.toFixed(2)}%)
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Day's Gain/Loss</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+$1,247.89</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+0.92% today</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cash Available</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$15,234</div>
              <p className="text-xs text-muted-foreground">
                Ready to invest
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Dividend Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$342.56</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">This month</span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Market Indices */}
        <Card>
          <CardHeader>
            <CardTitle>Market Indices</CardTitle>
            <CardDescription>Major market performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {marketIndices.map((index, i) => (
                <div key={i} className="p-4 rounded-lg border bg-card/50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{index.name}</h4>
                      <div className="text-lg font-bold">{index.value.toLocaleString()}</div>
                    </div>
                    <div className={`text-right ${index.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      <div className="flex items-center text-sm">
                        {index.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}
                      </div>
                      <div className="text-xs">({index.changePercent.toFixed(2)}%)</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portfolio Performance Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
              <CardDescription>Your investment growth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={portfolioPerformance}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Portfolio Value']} />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#22c55e" 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Portfolio Allocation */}
          <Card>
            <CardHeader>
              <CardTitle>Asset Allocation</CardTitle>
              <CardDescription>Portfolio distribution by sector</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={portfolioAllocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {portfolioAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Value']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {portfolioAllocation.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span>{item.sector}</span>
                    </div>
                    <span className="font-medium">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Stock Holdings */}
          <Card>
            <CardHeader>
              <CardTitle>Stock Holdings</CardTitle>
              <CardDescription>Your current equity positions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stockHoldings.map((stock, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{stock.symbol}</span>
                          <Badge variant="outline" className="text-xs">{stock.shares} shares</Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">{stock.name}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <MiniChart data={stock.dayData} />
                      <div className="text-right">
                        <div className="font-medium">${stock.currentPrice.toFixed(2)}</div>
                        <div className={`text-sm flex items-center ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {stock.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                          {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${stock.value.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Value</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Watchlist */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Watchlist</span>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </CardTitle>
              <CardDescription>Stocks you're monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    placeholder="Add stock to watchlist..." 
                    className="pl-10"
                  />
                </div>
                
                {watchlist.map((stock, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <div>
                        <div className="font-medium">{stock.symbol}</div>
                        <div className="text-sm text-muted-foreground">{stock.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${stock.price.toFixed(2)}</div>
                      <div className={`text-sm flex items-center ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {stock.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}