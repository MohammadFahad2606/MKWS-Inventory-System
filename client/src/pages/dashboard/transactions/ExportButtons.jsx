// src/components/transactions/ExportButtons.jsx
import React, { useState } from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'

export default function ExportButtons({ transactions }) {

    // console.log(transactions)
    // Export Excel
    const handleExportExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Transactions");

        worksheet.addRow(["Product", "Type", "Amount", "Date", "Time", "Remark"]);

        transactions.forEach((t) => {
            worksheet.addRow([
                t.productName,
                t.type,
                t.amount,
                new Date(t.date).toLocaleDateString(),
                new Date(t.date).toLocaleTimeString(),
                t.remark || "",
            ]);
        });

        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([buffer]), "transactions.xlsx");
    };

const handleExportPDF = () => {
  const doc = new jsPDF();

  doc.text("Transactions", 14, 16);

  autoTable(doc, {
    startY: 20,
    head: [["Product", "Type", "Amount", "Date", "Time", "Remark"]],
    body: transactions.map((t) => [
      t.productName,
      t.type,
      t.amount,
      new Date(t.date).toLocaleDateString(),
      new Date(t.date).toLocaleTimeString(),
      t.remark || "",
    ]),
  });

  doc.save("transactions.pdf");
};


    return (
        <div className="flex space-x-4 mb-4">
            <button
                onClick={handleExportPDF}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
                Export PDF
            </button>
            <button
                onClick={handleExportExcel}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
                Export Excel
            </button>
        </div>
    );
}
