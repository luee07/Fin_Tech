import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { FinanceDashboard } from './components/FinanceDashboard';
import { InvestmentDashboard } from './components/InvestmentDashboard';
import { Wallet, TrendingUp } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('finance');

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-fit">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="finance" className="flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                Finance
              </TabsTrigger>
              <TabsTrigger value="investments" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Investments
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {activeTab === 'finance' && <FinanceDashboard />}
        {activeTab === 'investments' && <InvestmentDashboard />}
      </div>
    </div>
  );
}