import React from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Controller, Control, useFieldArray } from "react-hook-form";
import { MoleculeSelector } from "../MoleculeSelector/MoleculeSelector";
import { FormValues } from "../../types";
export interface SpeciesProps {
  control: Control<FormValues>;
  isNonEquilibrium: boolean;
  isGeisa: boolean;
  isHitemp: boolean;
}

export const Species: React.FC<SpeciesProps> = ({
  control,
  isNonEquilibrium,
  isGeisa,
  isHitemp,
}) => {
  const { fields, append, remove } = useFieldArray<FormValues>({
    control,
    name: "species",
  });
  return (
    <Grid container spacing={3}>
      {fields.map((field, index) => (
        <React.Fragment key={field.id}>
          <Grid item xs={6}>
            <Controller
              name={`species.${index}.molecule` as const}
              control={control}
              render={({ field, formState }) => (
                <MoleculeSelector
                  validationError={formState.errors?.species?.[index]?.molecule}
                  control={control}
                  value={field.value}
                  onChange={field.onChange}
                  autofocus={index !== 0}
                  isNonEquilibrium={isNonEquilibrium}
                  isGeisa={isGeisa}
                  isHitemp={isHitemp}
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name={`species.${index}.mole_fraction` as const}
              control={control}
              render={({ field: { onChange, value }, formState }) => (
                <TextField
                  variant="standard"
                  fullWidth
                  id="mole-fraction-input"
                  label="Mole Fraction"
                  error={!!formState.errors?.species?.[index]?.mole_fraction}
                  helperText={
                    formState.errors?.species?.[index]?.mole_fraction?.message
                  }
                  value={value}
                  type="number"
                  onChange={(e) => {
                    onChange(parseFloat(e.target.value));
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={2}>
            {index === 0 ? (
              <IconButton
                color="primary"
                onClick={() =>
                  append({ molecule: undefined, mole_fraction: undefined })
                }
              >
                <AddIcon />
              </IconButton>
            ) : (
              <IconButton
                color="primary"
                disabled={fields.length === 1}
                onClick={() => {
                  remove(index);
                }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  );
};
