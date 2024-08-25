import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/purple.css";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const PersianDatePicker = ({ value, className }) => {
  const now = new Date();

  return (
    <DatePicker
      value={value === undefined ? now : value}
      calendar={persian}
      locale={persian_fa}
      inputClass={`border p-2 text-sm ${className}`}
    />
  );
};

export default PersianDatePicker;
