import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

export default function ProductInfoCard({ product }) {
  const chartRef = useRef(null);

  if (!product) return null;

  // Calculate totals
  const totalIn = product.transactions
    .filter((t) => t.type === 'IN')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalOut = product.transactions
    .filter((t) => t.type === 'OUT')
    .reduce((sum, t) => sum + t.amount, 0);

  const inHand = totalIn - totalOut;
  const inHandPercentage =
    totalIn > 0 ? ((inHand / totalIn) * 100).toFixed(1) : 0;

  // Render chart
  useEffect(() => {
    const options = {
      series: [parseFloat(inHandPercentage)],
      chart: {
        type: 'radialBar',
        height: 200,
        offsetY: -10,
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: 'var(--color-secondary-bg)',
            strokeWidth: '97%',
            margin: 5,
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              color: 'var(--shadow-color)',
              opacity: 0.3,
              blur: 2,
            },
          },
          dataLabels: {
            name: { show: false },
            value: {
              offsetY: -2,
              fontSize: '22px',
              formatter: function (val) {
                return val + '%';
              },
              style: {
                colors: ['var(--color-foreground)'], // changed from text-on-primary
              },
            },
          },
        },
      },
      fill: {
        colors: ['var(--color-warning)'],
        type: 'solid',
      },
      labels: ['In Hand'],
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => chart.destroy();
  }, [inHandPercentage]);

  return (
    <div
      className="w-full rounded-lg p-6"
      style={{
        backgroundColor: 'var(--color-surface)',
        color: 'var(--color-foreground)',
      }}
    >
      {/* Header */}
      <div className="mb-4 flex items-center">
        <span
          className="material-icons mr-2"
          style={{ color: 'var(--color-mutedForeground)' }}
        >
          Info :
        </span>
        <h2 className="text-lg font-semibold text-[var(--color-foreground)]">
          {product.name}
        </h2>
      </div>

      {/* Semi-Circle Chart */}
      <div id="chart" ref={chartRef} className="mb-4"></div>

      {/* Product Details */}
      <div
        className="space-y-2 rounded-lg p-4 text-sm"
        style={{ backgroundColor: 'var(--color-secondary-bg)' }}
      >
        <div className="flex justify-between">
          <span>Name</span>
          <span>{product.name}</span>
        </div>
        <div className="flex justify-between">
          <span>Buy Rate</span>
          <span>{product.buyRate.toLocaleString()}</span>
        </div>

        <div className="mt-2 grid grid-cols-3 gap-2 text-center">
          <div
            className="rounded p-2"
            style={{ backgroundColor: 'var(--color-success)', color: 'var(--color-foreground)' }}
          >
            TOTAL IN
            <br />
            <span>{totalIn}</span>
          </div>
          <div
            className="rounded p-2"
            style={{ backgroundColor: 'var(--color-destructive)', color: 'var(--color-foreground)' }}
          >
            TOTAL OUT
            <br />
            <span>{totalOut}</span>
          </div>
          <div
            className="rounded p-2"
            style={{ backgroundColor: 'var(--color-mutedForeground)', color: 'var(--color-foreground)' }}
          >
            IN HAND
            <br />
            <span>{inHand}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
