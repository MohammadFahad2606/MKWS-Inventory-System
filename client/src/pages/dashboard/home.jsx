import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '@/redux/productSlice';
import { StatisticsCard } from '@/widgets/cards';
import { StatisticsChart } from '@/widgets/charts';
import { Typography, Select, Option } from '@material-tailwind/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ScaleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/solid';

dayjs.extend(relativeTime);

export function Home() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);
  const [filter, setFilter] = useState('month');

  useEffect(() => {
    if (!items || items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items]);

  const {
    totalIn,
    totalOut,
    totalBalance,
    lowStock,
    chartData,
    recentTransactions,
  } = useMemo(() => {
    let totalIn = 0,
      totalOut = 0,
      totalBalance = 0,
      lowStock = 0;
    const grouped = {};
    const recentTransactions = [];

    const lowStockThreshold =
      parseInt(localStorage.getItem('lowStockThreshold')) || 5;

    items.forEach((product) => {
      const productBalance = product.transactions.reduce((acc, t) => {
        const date = dayjs(t.date);
        let include = false;
        const now = dayjs();
        if (filter === 'day') include = date.isSame(now, 'day');
        if (filter === 'week') include = date.isSame(now, 'week');
        if (filter === 'month') include = date.isSame(now, 'month');

        if (include) {
          if (t.type === 'IN') totalIn += t.amount;
          else totalOut += t.amount;

          const key = date.format('YYYY-MM-DD');
          if (!grouped[key]) grouped[key] = { in: 0, out: 0 };
          grouped[key][t.type.toLowerCase()] += t.amount;

          recentTransactions.push({
            product: product.name,
            type: t.type,
            amount: t.amount,
            date: t.date,
            remark: t.remark,
          });
        }

        return acc + (t.type === 'IN' ? t.amount : -t.amount);
      }, 0);

      totalBalance += productBalance;
      if (productBalance <= lowStockThreshold) lowStock++;
    });

    recentTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    const chartData = {
      options: {
        chart: { id: 'transactions' },
        xaxis: { categories: Object.keys(grouped) },
        colors: ['var(--color-success)', 'var(--color-destructive)'],
      },
      series: [
        { name: 'IN', data: Object.values(grouped).map((d) => d.in) },
        { name: 'OUT', data: Object.values(grouped).map((d) => d.out) },
      ],
    };

    return {
      totalIn,
      totalOut,
      totalBalance,
      lowStock,
      chartData,
      recentTransactions: recentTransactions.slice(0, 5),
    };
  }, [items, filter]);

  if (loading)
    return (
      <div className="py-20 text-center text-[var(--color-muted)]">
        Loading...
      </div>
    );

  return (
    <div className="mt-12 space-y-10">
      {/* Filter */}
      <div className="mb-6 flex justify-end">
        <Select
          value={filter}
          onChange={(val) => setFilter(val)}
          className="text-[var(--color-foreground)]"
        >
          <Option value="day">Today</Option>
          <Option value="week">This Week</Option>
          <Option value="month">This Month</Option>
        </Select>
      </div>
      {/* KPI Cards */}
      {/* <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatisticsCard
          title="Stock IN"
          value={totalIn}
          color="var(--color-success)"
          icon={<span>⬆️</span>}
        />
        <StatisticsCard
          title="Stock OUT"
          value={totalOut}
          color="var(--color-destructive)"
          icon={<span>⬇️</span>}
        />
        <StatisticsCard
          title="Current Balance"
          value={totalBalance}
          color="var(--color-primary)"
          icon={<span>⚖️</span>}
        />
        <StatisticsCard
          title="Low Stock"
          value={lowStock}
          color="var(--color-warning)"
          icon={<span>⚠️</span>}
        />
      </div> */}

      {/*  KPI Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatisticsCard
          title="Stock IN"
          value={totalIn}
          icon={<ArrowUpIcon className="h-6 w-6 text-[var(--color-success)]" />}
          color="white" // CardHeader background handled via class
        />
        <StatisticsCard
          title="Stock OUT"
          value={totalOut}
          icon={
            <ArrowDownIcon className="h-6 w-6 text-[var(--color-destructive)]" />
          }
          color="white"
        />
        <StatisticsCard
          title="Current Balance"
          value={totalBalance}
          icon={<ScaleIcon className="h-6 w-6 text-[var(--color-primary)]" />}
          color="white"
        />
        <StatisticsCard
          title="Low Stock"
          value={lowStock}
          icon={
            <ExclamationTriangleIcon className="h-6 w-6 text-[var(--color-warning)]" />
          }
          color="white"
        />
      </div>

      {/* Stock Movement Chart */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <StatisticsChart
          color="blue" // ✅ valid tailwind color
          chart={{
            type: 'bar',
            height: 300,
            series: chartData.series,
            options: chartData.options,
          }}
          title="Stock Movements"
          description={`Showing ${filter} wise transactions`}
          // className="!bg-[var(--color-foreground)]" // ✅ override bg color
        />

        {/* Recent Transactions Table */}
        <div className="rounded border bg-[var(--color-card)] p-6 shadow-sm">
          <Typography
            variant="h6"
            className="mb-4 text-[var(--color-foreground)]"
          >
            Recent Transactions
          </Typography>
          <table className="w-full text-left text-sm text-[var(--color-foreground)]">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="px-3 py-2">Product</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Remark</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-4 text-center text-[var(--color-muted)]"
                  >
                    No transactions found
                  </td>
                </tr>
              ) : (
                recentTransactions.map((t, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-[var(--color-border)] hover:bg-[var(--color-popover)]"
                  >
                    <td className="px-3 py-2">{t.product}</td>
                    <td
                      className={
                        t.type === 'IN'
                          ? 'text-[var(--color-success)]'
                          : 'text-[var(--color-destructive)]'
                      }
                    >
                      {t.type}
                    </td>
                    <td>{t.amount}</td>
                    <td>{t.remark || '-'}</td>
                    <td>{dayjs(t.date).format('DD MMM YYYY HH:mm')}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
