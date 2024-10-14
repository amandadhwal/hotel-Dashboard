// src/data/useData.ts
import { useState, useEffect } from "react";
import * as d3 from "d3";

export interface BookingData {
    arrival_date_year: number;
    arrival_date_month: string;
    arrival_date_day_of_month: number;
    adults: number;
    children: number;
    babies: number;
    country: string;
}

const useData = (csvFilePath: string) => {
    const [data, setData] = useState<BookingData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const csvRows = await d3.csv(csvFilePath) as d3.DSVRowArray<string>;

                // Map the CSV rows to BookingData type
                const bookings: BookingData[] = csvRows.map(row => ({
                    arrival_date_year: +row.arrival_date_year,
                    arrival_date_month: row.arrival_date_month,
                    arrival_date_day_of_month: +row.arrival_date_day_of_month,
                    adults: +row.adults,
                    children: +row.children,
                    babies: +row.babies,
                    country: row.country,
                }));

                setData(bookings);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching CSV:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [csvFilePath]);

    return { data, loading };
};

export default useData;
