import React from "react";

export default function TransactionList({ transactions }) {
  return (
    <div className="space-y-4">
      {transactions.map((t, idx) => {
        const dateObj = new Date(t.date);

        return (
          <div
            key={idx}
            className="bg-white shadow-md rounded-2xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              {/* Date & Day */}
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-700">
                  {dateObj.getDate()}
                </p>
                <p className="text-xs bg-orange-400 text-white rounded px-2 py-1">
                  {dateObj.toLocaleDateString("en-US", { weekday: "long" })}
                </p>
                {/* Time */}
                <p className="text-xs text-gray-500 mt-1">
                  {dateObj.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {/* Transaction Info */}
              <div>
                <p
                  className={`text-lg font-bold ${
                    t.type === "IN" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {t.amount} {t.type}
                </p>
                <p className="text-sm text-gray-500">{t.productName}</p>
              </div>
            </div>

            {/* Arrow */}
            <span className="text-white bg-gray-900 rounded-md p-2 cursor-pointer">➡</span>
          </div>
        );
      })}
    </div>
  );
}
