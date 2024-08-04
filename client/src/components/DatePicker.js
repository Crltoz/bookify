import { Dialog, Button } from "@mui/material";
import { addDays } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css"; 

const DatePicker = ({ open, onClose, onCancel, disabledDates, initialStart, initialEnd }) => {
  const [dateSelected, setDateSelected] = useState([
    {
      startDate: initialStart ? new Date(parseInt(initialStart)) : new Date(),
      endDate: initialEnd ? new Date(parseInt(initialEnd)) : addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  return (
    <Dialog
      open={open}
      onClose={onCancel}
    >
      <DateRange
        onChange={(item) => setDateSelected([item.selection])}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={dateSelected}
        locale={es}
        minDate={new Date()}
        maxDate={addDays(new Date(), 365)}
        disabledDates={disabledDates}
      />

      <Button onClick={() => onClose(dateSelected)}>Aceptar</Button>
    </Dialog>
  );
};

export default DatePicker;
