import React from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

// Helper: Convert image URL to small base64
const getResizedBase64Image = (url, maxWidth = 30) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = () => {
      const ratio = img.height / img.width;
      const canvas = document.createElement("canvas");
      canvas.width = maxWidth;
      canvas.height = maxWidth * ratio;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = reject;
  });

export default function ExportButtons({ transactions, type = "transactions" }) {
  const getDateTimeString = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    const h = String(now.getHours()).padStart(2, "0");
    const min = String(now.getMinutes()).padStart(2, "0");
    const s = String(now.getSeconds()).padStart(2, "0");
    return `${y}${m}${d}_${h}${min}${s}`;
  };

  const handleExportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(
      type === "lowstock" ? "Low Stock" : "Transactions"
    );

    // Headers
    const headers = ["#", "Product", "Type", "Amount", "Date", "Time", "Remark"];
    if (type === "lowstock") headers.push("Value (PKR)");
    worksheet.addRow(headers);

    // Rows
    transactions.forEach((t, idx) => {
      const value = t.amount * (t.buyRate || 0);
      const row = [
        idx + 1,
        t.productName,
        t.type,
        t.amount,
        new Date(t.date).toLocaleDateString(),
        new Date(t.date).toLocaleTimeString(),
        t.remark || "",
      ];
      if (type === "lowstock") row.push(value);
      worksheet.addRow(row);
    });

    worksheet.columns.forEach((column) => {
      let maxLength = 0;
      column.eachCell({ includeEmpty: true }, (cell) => {
        const cellValue = cell.value ? cell.value.toString() : "";
        if (cellValue.length > maxLength) maxLength = cellValue.length;
      });
      column.width = maxLength < 10 ? 10 : maxLength + 2;
    });

    const fileName = `${type === "lowstock" ? "lowstock" : "transactions"}+${getDateTimeString()}.xlsx`;
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), fileName);
  };

  const handleExportPDF = async () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const now = new Date();
    const formattedDate = now.toLocaleString();

    try {
      const logoBase64 = await getResizedBase64Image("/img/logo-ct.png", 100);
      doc.addImage(logoBase64, "PNG", 14, 5, 25, 0);
    } catch (err) {
      console.warn("Logo load failed", err);
    }

    doc.setFontSize(16);
    doc.text(
      type === "lowstock" ? "Low Stock Report" : "Transactions Report",
      pageWidth / 2,
      20,
      { align: "center" }
    );

    doc.setFontSize(10);
    doc.text(`Generated: ${formattedDate}`, pageWidth - 14, 20, { align: "right" });

    const tableData = transactions.map((t, idx) => {
      const row = [
        idx + 1,
        t.productName,
        t.type,
        t.amount,
        new Date(t.date).toLocaleDateString(),
        new Date(t.date).toLocaleTimeString(),
        t.remark || "",
      ];
      if (type === "lowstock") row.push(t.amount * (t.buyRate || 0));
      return row;
    });

    const head = ["#", "Product", "Type", "Amount", "Date", "Time", "Remark"];
    if (type === "lowstock") head.push("Value (PKR)");

    autoTable(doc, {
      startY: 35,
      head: [head],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [127, 127, 127], halign: "center" }, // mutedForeground
      bodyStyles: { fontSize: 10, textColor: [37, 37, 37] }, // foreground
      alternateRowStyles: { fillColor: [247, 247, 247] }, // muted
      columnStyles: {
        0: { cellWidth: 8 },
        1: { cellWidth: 40 },
        2: { cellWidth: 20 },
        3: { cellWidth: 15, halign: "right" },
        4: { cellWidth: 25 },
        5: { cellWidth: 20 },
        6: { cellWidth: 40 },
        7: { cellWidth: 25, halign: "right" },
      },
      didDrawPage: (data) => {
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(10);
        doc.text(
          `Page ${doc.internal.getCurrentPageInfo().pageNumber} of ${pageCount}`,
          pageWidth / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: "center" }
        );
      },
    });

    if (type === "lowstock") {
      const totalValue = transactions.reduce(
        (sum, t) => sum + (t.amount * (t.buyRate || 0)),
        0
      );
      const finalY = doc.lastAutoTable.finalY || 35;
      doc.setFontSize(12);
      doc.text(
        `Total Value: ${totalValue} PKR`,
        pageWidth - 14,
        finalY + 10,
        { align: "right" }
      );
    }

    doc.save(`${type === "lowstock" ? "lowstock" : "transactions"}+${getDateTimeString()}.pdf`);
  };

  return (
    <div className="flex space-x-4 mb-4">
      <button
        onClick={handleExportPDF}
        className="px-4 py-2 rounded-lg"
        style={{
          background: "var(--color-destructive)",
          color: "var(--color-primaryForeground)",
        }}
      >
        Export PDF
      </button>
      <button
        onClick={handleExportExcel}
        className="px-4 py-2 rounded-lg"
        style={{
          background: "var(--color-accent)",
          color: "var(--color-accentForeground)",
        }}
      >
        Export Excel
      </button>
    </div>
  );
}
