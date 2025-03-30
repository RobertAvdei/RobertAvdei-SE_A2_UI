import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import {
  GridActionsCellItem,
  type GridColDef,
  type GridRowId,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import type { User } from "~/constants/interfaces";
import { fetchValue } from "~/constants/utils";
import { DataGridComponent } from "~/sharedComponents/DataGridComponent";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { GridBox } from "~/sharedComponents/GridBox";
import AddIcon from "@mui/icons-material/Add";

export const UsersContent = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const serverLink = import.meta.env.VITE_SERVER_LINK;
    fetchValue(`${serverLink}/users`, setRows);
  }, []);

  const handleEditClick = (id: GridRowId) => () => {
    console.log("id", id);
  };

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "userID",
      headerName: "User ",
      minWidth: 150,
      valueGetter: (value, row: User) => row.userID,
    },
    {
      field: "age",
      headerName: "Age",
      minWidth: 250,
    },
    {
      field: "gender",
      headerName: "Gender",
      minWidth: 250,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<OpenInFullIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
      <div className="max-w-[900px] w-full space-y-6 px-4">
        <Grid
          container
          spacing={3}
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <GridBox size={12}>
            <BoxContent />
          </GridBox>
          <Grid size={12}>
            <DataGridComponent
              columns={columns}
              rows={rows}
              getRowId={(row) => row.userID}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

interface BoxContentProps {

}

const BoxContent = () => {
  return (
    <Grid
      container
      spacing={3}
      direction="row"
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Grid width={200}>
        <TextField id="Age" label="Age" variant="outlined" />
      </Grid>
      <Grid width={200}>
        <SelectComponent
          label="Gender"
          values={[
            { value: "g", label: "Female" },
            { value: "m", label: "Male" },
          ]}
        />
      </Grid>
      <Grid width={200}>
        <Button variant="outlined" startIcon={<AddIcon />}>
          Add new User
        </Button>
      </Grid>
    </Grid>
  );
};

interface SelectComponentProps {
  values: any[];
  label: string;
  id?: string;
}

const SelectComponent = ({
  values,
  label,
  id = "select",
  ...props
}: SelectComponentProps) => {
  const [current, setCurrent] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setCurrent(event.target.value as string);
  };
  return (
    <FormControl fullWidth>
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        labelId={id}
        id={id}
        value={current}
        label={label}
        onChange={handleChange}
      >
        {values.map((item) => (
          <MenuItem value={item.value}>{item.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
