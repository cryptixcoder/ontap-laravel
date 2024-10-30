import AdminLayout from '@/Layouts/AdminLayout';
import { Card, CardContent, CardHeader } from '@/Components/ui/card';

export default function Dashboard() {
    return (
        <AdminLayout>
            <div className='mt-4 space-y-4 container mx-auto h-full'>
              {/* <MRR mrr={formatter.format(analytics.mrr.total ? analytics.mrr.total.toNumber()/100: 0)} percentage={analytics.mrr.percentage} chartData={analytics.mrr.chart} /> */}
              <div className="grid grid-cols-4 gap-4">
                <Card>
                  <CardHeader>
                    <h3>Active Subscribers</h3>
                  </CardHeader>
                  <CardContent>
                    <h1 className="text-2xl">1 <small className='text-sm text-gray-400'>1 previous period</small></h1>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <h3>Paused Subscribers</h3>
                  </CardHeader>
                  <CardContent>
                    <h1 className="text-2xl">1 <small className='text-sm text-gray-400'>1 previous period</small></h1>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <h3>Tasks Worked On</h3>
                  </CardHeader>
                  <CardContent>
                    <h1 className="text-2xl">1 <small className='text-sm text-gray-400'>1 previous period</small></h1>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <h3>Median task completion time</h3>
                  </CardHeader>
                  <CardContent>
                    <h1 className="text-2xl">1 <small className='text-sm text-gray-400'>1 previous period</small></h1>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <h3>Sprints - New</h3>
                  </CardHeader>
                  <CardContent>
                    <h1 className="text-2xl">1 <small className='text-sm text-gray-400'>1 previous period</small></h1>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <h3>Sprints - Onboarded</h3>
                  </CardHeader>
                  <CardContent>
                    <h1 className="text-2xl">1 <small className='text-sm text-gray-400'>1 previous period</small></h1>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <h3>Sprints - Completed</h3>
                  </CardHeader>
                  <CardContent>
                    <h1 className="text-2xl">1 <small className='text-sm text-gray-400'>1 previous period</small></h1>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <h3>Sprints - Total</h3>
                  </CardHeader>
                  <CardContent>
                    <h1 className="text-2xl">1 <small className='text-sm text-gray-400'>1 previous period</small></h1>
                  </CardContent>
                </Card>
              </div>
            </div>
        </AdminLayout>
    )
}
