import {
  Button,
  Fab,
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
import { useEffect, useState, type FormEvent } from "react";
import type { User } from "~/constants/interfaces";
import { fetchValue, postValue } from "~/constants/utils";
import { DataGridComponent } from "~/sharedComponents/DataGridComponent";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { GridBox } from "~/sharedComponents/GridBox";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { UserModal } from "./UserModal";

export const UsersContent = () => {
  const [rows, setRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({} as User);
  const [hasNameColumn, setHasNameColumn] = useState(false);
  const serverLink = import.meta.env.VITE_SERVER_LINK;

  const updateTable = () => {
    fetchValue(`${serverLink}/users`, setRows);
  };

  useEffect(() => {
    fetchValue(`${serverLink}/users/hasName`, setHasNameColumn);
    updateTable();
  }, []);

  const handleEditClick = (id: GridRowId, row: User) => () => {
    setShowModal(true);
    setCurrentUser(row);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentUser({} as User);
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
      getActions: ({ id, row }) => {
        return [
          <GridActionsCellItem
            icon={<OpenInFullIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id, row)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const onSuccess = (data: any) => {
    updateTable();
    alert("New user added!");
  };

  const onSubmit = (data: string) => {
    console.log("data", data);

    postValue(`${serverLink}/users`, data, onSuccess);
  };

  const changeColumnName = () => {
    fetchValue(`${serverLink}/users/switchName`, () => {
      fetchValue(`${serverLink}/users/hasName`, setHasNameColumn);
    });
  };

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
            <BoxContent onSubmit={onSubmit} />
          </GridBox>
          <Grid size={12}>
            <DataGridComponent
              columns={columns}
              rows={rows}
              getRowId={(row) => row.userID}
              initialSort="userID"
            />
          </Grid>
        </Grid>
        <UserModal
          open={showModal}
          handleClose={handleModalClose}
          user={currentUser}
        />
        <HasNameFab hasNameColumn={hasNameColumn} onClick={changeColumnName} />
      </div>
    </div>
  );
};

interface BoxContentProps {
  onSubmit: Function;
}

const BoxContent = ({ onSubmit, ...props }: BoxContentProps) => {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  const onSubmitCallback = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ age, gender });
  };

  return (
    <form onSubmit={onSubmitCallback}>
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
          <TextField
            id="Age"
            label="Age"
            variant="outlined"
            onChange={(event) => {
              setAge(event.target.value);
              return event;
            }}
          />
        </Grid>
        <Grid width={200}>
          <SelectComponent
            id="Gender"
            label="Gender"
            onChange={setGender}
            values={[
              { value: "f", label: "Female" },
              { value: "m", label: "Male" },
            ]}
          />
        </Grid>
        <Grid width={200}>
          <Button variant="outlined" startIcon={<AddIcon />} type="submit">
            Add new User
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

interface SelectComponentProps {
  values: any[];
  label: string;
  id?: string;
  onChange?: Function;
}

const SelectComponent = ({
  values,
  label,
  id = "select",
  onChange,
  ...props
}: SelectComponentProps) => {
  const [current, setCurrent] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setCurrent(event.target.value as string);
    onChange?.(event.target.value as string);
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
          <MenuItem key={item.label} id={item.label} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

interface hasNameFabProp {
  hasNameColumn: boolean;
  onClick: Function;
}

const HasNameFab = ({ hasNameColumn, onClick, ...prop }: hasNameFabProp) => {
  const text = hasNameColumn ? "Remove Name Column" : "Add Name Column";
  const handleChange = () => {
    onClick();
  };
  return (
    <Fab
      variant="extended"
      onClick={handleChange}
      sx={{
        margin: 0,
        top: "auto",
        right: 20,
        bottom: 20,
        left: "auto",
        position: "fixed",
      }}
    >
      {hasNameColumn ? (
        <RemoveIcon sx={{ mr: 1 }} />
      ) : (
        <AddIcon sx={{ mr: 1 }} />
      )}
      {text}
    </Fab>
  );
};
