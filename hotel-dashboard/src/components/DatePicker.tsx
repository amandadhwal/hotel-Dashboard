import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onDateChange: (start: Date, end: Date) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ startDate, endDate, onDateChange }) => {
  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date) => onDateChange(date as Date, endDate)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => onDateChange(startDate, date as Date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
};

export default DateRangePicker;
