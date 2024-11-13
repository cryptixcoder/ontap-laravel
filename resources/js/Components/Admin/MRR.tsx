import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown } from 'lucide-react';


interface MRRDataPoint {
    date: string;
    mrr: number;
}

interface MRRGrowth {
    value: number;
    percentage: number;
}

type TimeRange = '7' | '30' | '90';

export default function MRR() {
    const [timeRange, setTimeRange] = useState<TimeRange>('30');
    const [mrrData, setMRRData] = useState<MRRDataPoint[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMRRData = async () => {
        setLoading(true);
        try {
            const response = await fetch(route('admin.dashboard.mrr', { days: timeRange }));
            const data = await response.json();
            setMRRData(data);
        } catch (error) {
            console.error('Error fetching MRR data:', error);
        }
        setLoading(false);
        };

        fetchMRRData();
    }, [timeRange]);

    const formatCurrency = (value:any) => {
        return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
        }).format(value);
    };

    const calculateMRRGrowth = () => {
        if (mrrData.length < 2) return { value: 0, percentage: 0 };

        const currentMRR = mrrData[mrrData.length - 1].mrr;
        const previousMRR = mrrData[0].mrr;
        const difference = currentMRR - previousMRR;
        const percentage = previousMRR ? (difference / previousMRR) * 100 : 0;

        return {
        value: difference,
        percentage: percentage
        };
    };

    const growth = calculateMRRGrowth();
    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">Monthly Recurring Revenue</CardTitle>
                <Select
                    value={timeRange}
                    onValueChange={(value: TimeRange) => setTimeRange(value)}
                >
                <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="7">Past 7 days</SelectItem>
                    <SelectItem value="30">Past 30 days</SelectItem>
                    <SelectItem value="90">Past 90 days</SelectItem>
                </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-2xl font-bold">
                        {formatCurrency(mrrData[mrrData.length - 1]?.mrr || 0)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Current MRR
                    </p>
                    </div>
                    <div className={`flex items-center space-x-1 ${growth.percentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {growth.percentage >= 0 ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
                    <span className="text-sm font-medium">
                        {formatCurrency(Math.abs(growth.value))} ({Math.abs(growth.percentage).toFixed(1)}%)
                    </span>
                    </div>
                </div>

                <div className="h-[200px] w-full">
                    {loading ? (
                    <div className="flex h-full items-center justify-center">
                        <p className="text-sm text-muted-foreground">Loading...</p>
                    </div>
                    ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mrrData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis
                            dataKey="date"
                            tickFormatter={(date) => new Date(date).toLocaleDateString()}
                            className="text-xs"
                        />
                        <YAxis
                            tickFormatter={formatCurrency}
                            className="text-xs"
                        />
                        <Tooltip
                            formatter={(value) => [formatCurrency(value), "MRR"]}
                            labelFormatter={(date) => new Date(date).toLocaleDateString()}
                        />
                        <Line
                            type="monotone"
                            dataKey="mrr"
                            stroke="#2563eb"
                            strokeWidth={2}
                            dot={false}
                        />
                        </LineChart>
                    </ResponsiveContainer>
                    )}
                </div>
                </div>
            </CardContent>
            </Card>
    )
}
