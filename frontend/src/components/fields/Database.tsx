import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Control, Controller } from "react-hook-form";
import { FormValues } from "../types";

interface DatabaseProps {
  control: Control<FormValues>;
}

export const Database: React.FC<DatabaseProps> = ({ control }) => {
  return (
    <FormControl fullWidth>
      <InputLabel variant="standard" id="database-input">
        Database
      </InputLabel>
      <Controller
        name="database"
        defaultValue="hitran"
        control={control}
        render={({ field, formState }) => (
          <Select
            {...field}
            {...formState}
            variant="standard"
            labelId="database-label"
            id="database-select"
            onChange={field.onChange}
            value={field.value}
            label="Select"
          >
            <MenuItem value={"hitran"}>HITRAN</MenuItem>
            <MenuItem value={"geisa"}>GEISA</MenuItem>
            <MenuItem value={"hitemp"}>HITEMP</MenuItem>
          </Select>
        )}
      />
    </FormControl>
  );
};
