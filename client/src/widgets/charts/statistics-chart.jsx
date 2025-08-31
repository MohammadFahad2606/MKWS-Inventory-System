import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';

export function StatisticsChart({ color, chart, title, description, footer }) {
  const colorVarMap = {
    white: 'var(--color-card)',
    'blue-gray': 'var(--color-foreground)',
    gray: 'var(--color-muted)',
    brown: 'var(--color-secondary)',
    'deep-orange': 'var(--color-accent)',
    orange: 'var(--color-warning)',
    amber: 'var(--color-accent)',
    yellow: 'var(--color-accent)',
    'light-green': 'var(--color-success)',
    green: 'var(--color-success)',
    teal: 'var(--color-primary)',
    cyan: 'var(--color-primary)',
    'light-blue': 'var(--color-primary)',
    blue: 'var(--color-primary)',
    indigo: 'var(--color-primary)',
    'deep-purple': 'var(--color-foreground)',
    purple: 'var(--color-secondary)',
    pink: 'var(--color-accent)',
    red: 'var(--color-destructive)',
  };

  // const chartBg = colorVarMap[color] || 'var(--color-primary)';
  const chartBg = 'var(--color-card)'; // White background


  // Merge custom toolbar background into chart options
  const chartOptions = {
    ...chart.options,
    chart: {
      ...chart.options.chart,
      toolbar: {
        ...chart.options.chart?.toolbar,
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        },
        offsetX: 0,
        offsetY: 0,
        autoSelected: 'zoom',
        icons: {
          download: `<svg xmlns="http://www.w3.org/2000/svg" fill="var(--color-foreground)" viewBox="0 0 24 24" width="20" height="20"><path d="M5 20h14v-2H5v2zm7-18L5.33 9h4.67v6h4V9h4.67L12 2z"/></svg>`,
        },
      },
      background: chartBg,
    },
  };

  return (
    <Card className="border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm">
      <CardHeader
        variant="filled"
        floated={false}
        shadow={false}
        className="!bg-[var(--color-background)]"
      >
        <Chart {...chart} options={chartOptions} />
      </CardHeader>
      <CardBody className="px-6 pt-0">
        <Typography variant="h6" className="text-[var(--color-foreground)]">
          {title}
        </Typography>
        <Typography
          variant="small"
          className="font-normal text-[var(--color-foreground)]"
        >
          {description}
        </Typography>
      </CardBody>
      {footer && (
        <CardFooter className="border-t border-[var(--color-border)] px-6 py-5">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}

StatisticsChart.defaultProps = {
  color: 'foreground',
  footer: null,
};

StatisticsChart.propTypes = {
  color: PropTypes.oneOf([
    'white',
    'blue-gray',
    'gray',
    'brown',
    'deep-orange',
    'orange',
    'amber',
    'yellow',
    'lime',
    'light-green',
    'green',
    'teal',
    'cyan',
    'light-blue',
    'blue',
    'indigo',
    'deep-purple',
    'purple',
    'pink',
    'red',
  ]),
  chart: PropTypes.object.isRequired,
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

StatisticsChart.displayName = '/src/widgets/charts/statistics-chart.jsx';

export default StatisticsChart;
