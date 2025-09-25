import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AdminReportsPage = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Analytics & Forecasting</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="qtd">Quarter to date</SelectItem>
                <SelectItem value="ytd">Year to date</SelectItem>
              </SelectContent>
            </Select>
            <Button className="btn-hero">Generate Report</Button>
            <Button variant="secondary">Export CSV</Button>
          </div>
          <div className="h-48 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
            Forecast charts placeholder
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
              Demographic analysis placeholder
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Effectiveness & Cost-Benefit</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2">
              <li>Match Rate +18% after onboarding campaign</li>
              <li>Support cost per student -9% QoQ</li>
              <li>Top-performing partnerships: City Housing, Co-ops</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm list-disc pl-5 space-y-2">
            <li>Expand inventory onboarding before Fall rush</li>
            <li>Introduce roommate preference questionnaire</li>
            <li>Offer early-bird discounts with partners</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminReportsPage;


