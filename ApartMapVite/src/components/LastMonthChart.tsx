import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, subMonths, eachDayOfInterval } from "date-fns";

export const LastMonthInfo = ({ lastMonthInfo }: any) => {
  // Function to generate dates for the last month
  const getLastMonthDates = () => {
    const today = new Date();
    const lastMonthStart = subMonths(today, 1);
    const daysOfLastMonth = eachDayOfInterval({
      start: lastMonthStart,
      end: today,
    });
    return daysOfLastMonth.map((date) => format(date, "yyyy-MM-dd"));
  };

  // Generate dates for the last month
  const dates = getLastMonthDates();

  // Map over the dates and create an array of objects with date and active_patients_per_day
  const dataForChart = dates.map((date) => {
    const infoForDate = lastMonthInfo.find(
      (info) => info.activity_date === date
    );
    return {
      activity_date: date,
      active_patients_per_day: infoForDate
        ? infoForDate.active_patients_per_day
        : 0,
    };
  });

  return (
    <>
      <p style={{ paddingTop: "10px" }}>
        How many active corona patients have there been every day in the last
        month
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={dataForChart}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="activity_date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="active_patients_per_day"
            stroke="#8884d8"
            strokeWidth={2}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
