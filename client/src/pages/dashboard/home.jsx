// import React from "react";
// import {
//   Typography,
//   Card,
//   CardHeader,
//   CardBody,
//   IconButton,
//   Menu,
//   MenuHandler,
//   MenuList,
//   MenuItem,
//   Avatar,
//   Tooltip,
//   Progress,
// } from "@material-tailwind/react";
// import {
//   EllipsisVerticalIcon,
//   ArrowUpIcon,
// } from "@heroicons/react/24/outline";
// import { StatisticsCard } from "@/widgets/cards";
// import { StatisticsChart } from "@/widgets/charts";
// import {
//   statisticsCardsData,
//   statisticsChartsData,
//   projectsTableData,
//   ordersOverviewData,
// } from "@/data";
// import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";

// export function Home() {
//   return (
//     <div className="mt-12">
//       <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
//         {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
//           <StatisticsCard
//             key={title}
//             {...rest}
//             title={title}
//             icon={React.createElement(icon, {
//               className: "w-6 h-6 text-white",
//             })}
//             footer={
//               <Typography className="font-normal text-blue-gray-600">
//                 <strong className={footer.color}>{footer.value}</strong>
//                 &nbsp;{footer.label}
//               </Typography>
//             }
//           />
//         ))}
//       </div>
//       <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
//         {statisticsChartsData.map((props) => (
//           <StatisticsChart
//             key={props.title}
//             {...props}
//             footer={
//               <Typography
//                 variant="small"
//                 className="flex items-center font-normal text-blue-gray-600"
//               >
//                 <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
//                 &nbsp;{props.footer}
//               </Typography>
//             }
//           />
//         ))}
//       </div>
//       <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
//         <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
//           <CardHeader
//             floated={false}
//             shadow={false}
//             color="transparent"
//             className="m-0 flex items-center justify-between p-6"
//           >
//             <div>
//               <Typography variant="h6" color="blue-gray" className="mb-1">
//                 Projects
//               </Typography>
//               <Typography
//                 variant="small"
//                 className="flex items-center gap-1 font-normal text-blue-gray-600"
//               >
//                 <CheckCircleIcon strokeWidth={3} className="h-4 w-4 text-blue-gray-200" />
//                 <strong>30 done</strong> this month
//               </Typography>
//             </div>
//             <Menu placement="left-start">
//               <MenuHandler>
//                 <IconButton size="sm" variant="text" color="blue-gray">
//                   <EllipsisVerticalIcon
//                     strokeWidth={3}
//                     fill="currenColor"
//                     className="h-6 w-6"
//                   />
//                 </IconButton>
//               </MenuHandler>
//               <MenuList>
//                 <MenuItem>Action</MenuItem>
//                 <MenuItem>Another Action</MenuItem>
//                 <MenuItem>Something else here</MenuItem>
//               </MenuList>
//             </Menu>
//           </CardHeader>
//           <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
//             <table className="w-full min-w-[640px] table-auto">
//               <thead>
//                 <tr>
//                   {["companies", "members", "budget", "completion"].map(
//                     (el) => (
//                       <th
//                         key={el}
//                         className="border-b border-blue-gray-50 py-3 px-6 text-left"
//                       >
//                         <Typography
//                           variant="small"
//                           className="text-[11px] font-medium uppercase text-blue-gray-400"
//                         >
//                           {el}
//                         </Typography>
//                       </th>
//                     )
//                   )}
//                 </tr>
//               </thead>
//               <tbody>
//                 {projectsTableData.map(
//                   ({ img, name, members, budget, completion }, key) => {
//                     const className = `py-3 px-5 ${
//                       key === projectsTableData.length - 1
//                         ? ""
//                         : "border-b border-blue-gray-50"
//                     }`;

//                     return (
//                       <tr key={name}>
//                         <td className={className}>
//                           <div className="flex items-center gap-4">
//                             <Avatar src={img} alt={name} size="sm" />
//                             <Typography
//                               variant="small"
//                               color="blue-gray"
//                               className="font-bold"
//                             >
//                               {name}
//                             </Typography>
//                           </div>
//                         </td>
//                         <td className={className}>
//                           {members.map(({ img, name }, key) => (
//                             <Tooltip key={name} content={name}>
//                               <Avatar
//                                 src={img}
//                                 alt={name}
//                                 size="xs"
//                                 variant="circular"
//                                 className={`cursor-pointer border-2 border-white ${
//                                   key === 0 ? "" : "-ml-2.5"
//                                 }`}
//                               />
//                             </Tooltip>
//                           ))}
//                         </td>
//                         <td className={className}>
//                           <Typography
//                             variant="small"
//                             className="text-xs font-medium text-blue-gray-600"
//                           >
//                             {budget}
//                           </Typography>
//                         </td>
//                         <td className={className}>
//                           <div className="w-10/12">
//                             <Typography
//                               variant="small"
//                               className="mb-1 block text-xs font-medium text-blue-gray-600"
//                             >
//                               {completion}%
//                             </Typography>
//                             <Progress
//                               value={completion}
//                               variant="gradient"
//                               color={completion === 100 ? "green" : "blue"}
//                               className="h-1"
//                             />
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   }
//                 )}
//               </tbody>
//             </table>
//           </CardBody>
//         </Card>
//         <Card className="border border-blue-gray-100 shadow-sm">
//           <CardHeader
//             floated={false}
//             shadow={false}
//             color="transparent"
//             className="m-0 p-6"
//           >
//             <Typography variant="h6" color="blue-gray" className="mb-2">
//               Orders Overview
//             </Typography>
//             <Typography
//               variant="small"
//               className="flex items-center gap-1 font-normal text-blue-gray-600"
//             >
//               <ArrowUpIcon
//                 strokeWidth={3}
//                 className="h-3.5 w-3.5 text-green-500"
//               />
//               <strong>24%</strong> this month
//             </Typography>
//           </CardHeader>
//           <CardBody className="pt-0">
//             {ordersOverviewData.map(
//               ({ icon, color, title, description }, key) => (
//                 <div key={title} className="flex items-start gap-4 py-3">
//                   <div
//                     className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${
//                       key === ordersOverviewData.length - 1
//                         ? "after:h-0"
//                         : "after:h-4/6"
//                     }`}
//                   >
//                     {React.createElement(icon, {
//                       className: `!w-5 !h-5 ${color}`,
//                     })}
//                   </div>
//                   <div>
//                     <Typography
//                       variant="small"
//                       color="blue-gray"
//                       className="block font-medium"
//                     >
//                       {title}
//                     </Typography>
//                     <Typography
//                       as="span"
//                       variant="small"
//                       className="text-xs font-medium text-blue-gray-500"
//                     >
//                       {description}
//                     </Typography>
//                   </div>
//                 </div>
//               )
//             )}
//           </CardBody>
//         </Card>
//       </div>
//     </div>
//   );
// }

// export default Home;


import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "@/redux/productSlice";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import { Typography, Select, Option, Progress } from "@material-tailwind/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function Home() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);

  const [filter, setFilter] = useState("month");

 // ✅ Only fetch if items not already in store
 useEffect(() => {
  if (!items || items.length === 0) {
    dispatch(fetchProducts());
  }
}, [dispatch, items])

  // Calculate stats & chart data old
  // const { totalIn, totalOut, totalBalance, lowStock, chartData, recentTransactions } = useMemo(() => {
  //   let totalIn = 0, totalOut = 0, totalBalance = 0, lowStock = 0;
  //   const grouped = {};
  //   const recentTransactions = [];

  //   items.forEach((product) => {
  //     const productBalance = product.transactions.reduce((acc, t) => {
  //       const date = dayjs(t.date);
  //       let include = false;
  //       const now = dayjs();
  //       if (filter === "day") include = date.isSame(now, "day");
  //       if (filter === "week") include = date.isSame(now, "week");
  //       if (filter === "month") include = date.isSame(now, "month");

  //       if (include) {
  //         if (t.type === "IN") totalIn += t.amount;
  //         else totalOut += t.amount;

  //         const key = date.format("YYYY-MM-DD");
  //         if (!grouped[key]) grouped[key] = { in: 0, out: 0 };
  //         grouped[key][t.type.toLowerCase()] += t.amount;

  //         recentTransactions.push({
  //           product: product.name,
  //           type: t.type,
  //           amount: t.amount,
  //           date: t.date,
  //           remark: t.remark,
  //         });
  //       }
  //       return acc + (t.type === "IN" ? t.amount : -t.amount);
  //     }, 0);

  //     totalBalance += productBalance;

  //     if (productBalance <= 5) lowStock++; // example threshold
  //   });

  //   // sort recent transactions by date desc
  //   recentTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    
  //   // chart data
  //   const chartData = {
  //     options: { chart: { id: "transactions" }, xaxis: { categories: Object.keys(grouped) } },
  //     series: [
  //       { name: "IN", data: Object.values(grouped).map((d) => d.in) },
  //       { name: "OUT", data: Object.values(grouped).map((d) => d.out) },
  //     ],
  //   };

  //   return { totalIn, totalOut, totalBalance, lowStock, chartData, recentTransactions: recentTransactions.slice(0,5) };
  // }, [items, filter]);

// calculate stats & chart data new
const { totalIn, totalOut, totalBalance, lowStock, chartData, recentTransactions } = useMemo(() => {
  let totalIn = 0, totalOut = 0, totalBalance = 0, lowStock = 0;
  const grouped = {};
  const recentTransactions = [];

  // get threshold from localStorage
  const lowStockThreshold = parseInt(localStorage.getItem("lowStockThreshold")) || 5;

  items.forEach((product) => {
    // calculate product balance
    const productBalance = product.transactions.reduce((acc, t) => {
      const date = dayjs(t.date);
      let include = false;
      const now = dayjs();
      if (filter === "day") include = date.isSame(now, "day");
      if (filter === "week") include = date.isSame(now, "week");
      if (filter === "month") include = date.isSame(now, "month");

      if (include) {
        if (t.type === "IN") totalIn += t.amount;
        else totalOut += t.amount;

        const key = date.format("YYYY-MM-DD");
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

      return acc + (t.type === "IN" ? t.amount : -t.amount);
    }, 0);

    totalBalance += productBalance;

    // ✅ lowStock based on threshold from localStorage
    if (productBalance <= lowStockThreshold) lowStock++;
  });

  // sort recent transactions by date desc
  recentTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // chart data
  const chartData = {
    options: { chart: { id: "transactions" }, xaxis: { categories: Object.keys(grouped) } },
    series: [
      { name: "IN", data: Object.values(grouped).map((d) => d.in) },
      { name: "OUT", data: Object.values(grouped).map((d) => d.out) },
    ],
  };

  return { totalIn, totalOut, totalBalance, lowStock, chartData, recentTransactions: recentTransactions.slice(0,5) };
}, [items, filter]);



  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="mt-12 space-y-10">
      {/* Filter */}
      <div className="flex justify-end mb-6">
        <Select value={filter} onChange={(val) => setFilter(val)}>
          <Option value="day">Today</Option>
          <Option value="week">This Week</Option>
          <Option value="month">This Month</Option>
        </Select>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatisticsCard title="Stock IN" value={totalIn} color="green" icon={<span>⬆️</span>} />
        <StatisticsCard title="Stock OUT" value={totalOut} color="red" icon={<span>⬇️</span>} />
        <StatisticsCard title="Current Balance" value={totalBalance} color="blue" icon={<span>⚖️</span>} />
        <StatisticsCard title="Low Stock" value={lowStock} color="orange" icon={<span>⚠️</span>} />
      </div>

      {/* Stock Movement Chart */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <StatisticsChart
          color="blue"
          chart={{ type: "bar", height: 300, series: chartData.series, options: chartData.options }}
          title="Stock Movements"
          description={`Showing ${filter} wise transactions`}
        />

        {/* Recent Transactions Table */}
        <div className="border rounded shadow-sm p-6 bg-white">
          <Typography variant="h6" className="mb-4">Recent Transactions</Typography>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-3">Product</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Remark</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-400">
                    No transactions found
                  </td>
                </tr>
              ) : (
                recentTransactions.map((t, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3">{t.product}</td>
                    <td className={t.type === "IN" ? "text-green-600" : "text-red-600"}>{t.type}</td>
                    <td>{t.amount}</td>
                    <td>{t.remark || "-"}</td>
                    <td>{dayjs(t.date).format("DD MMM YYYY HH:mm")}</td>
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
