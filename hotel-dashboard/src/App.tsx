// src/App.tsx
import React, { useState } from "react";
import useData, { BookingData } from "./data/useData"; 
import DateRangePicker from "./components/DatePicker";
import TimeSeriesChart from "./components/TimeSeriesChart";
import ColumnChart from "./components/ColumnChart";
import SparklineChart from "./components/SparklineChart";

const App: React.FC = () => {
    const { data, loading } = useData("/hotel_bookings_1000.csv"); // Path to the CSV in the public folder

    const [startDate, setStartDate] = useState(new Date("2020-01-01"));
    const [endDate, setEndDate] = useState(new Date());

    const handleDateChange = (start: Date, end: Date) => {
        setStartDate(start);
        setEndDate(end);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const filteredData = data.filter((d: BookingData) => {
        const bookingDate = new Date(`${d.arrival_date_year}-${d.arrival_date_month}-${d.arrival_date_day_of_month}`);
        return bookingDate >= startDate && bookingDate <= endDate;
    });

    const visitorsPerDay = filteredData.map((d: BookingData) => ({
        date: `${d.arrival_date_year}-${d.arrival_date_month}-${d.arrival_date_day_of_month}`,
        visitors: d.adults + d.children + d.babies,
    }));

    const visitorsPerCountry = filteredData.reduce((acc: Record<string, number>, d: BookingData) => {
        acc[d.country] = (acc[d.country] || 0) + d.adults + d.children + d.babies;
        return acc;
    }, {});

    const adults = filteredData.map(d => d.adults);
    const children = filteredData.map(d => d.children);

    return (
        <div>
            <DateRangePicker startDate={startDate} endDate={endDate} onDateChange={handleDateChange} />
            <TimeSeriesChart data={visitorsPerDay} />
            <ColumnChart data={Object.entries(visitorsPerCountry).map(([country, visitors]) => ({ country, visitors }))} />
            <SparklineChart data={adults} title="Adults Visitors" />
            <SparklineChart data={children} title="Children Visitors" />
        </div>
    );
};

export default App;
