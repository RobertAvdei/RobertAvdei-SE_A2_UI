import { Grid } from "@mui/material";
import {
  GridActionsCellItem,
  type GridColDef,
  type GridRowId,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import type { Book, User } from "~/constants/interfaces";
import { fetchValue } from "~/constants/utils";
import { DataGridComponent } from "~/sharedComponents/DataGridComponent";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

export const BooksContent = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const serverLink = import.meta.env.VITE_SERVER_LINK;
    fetchValue(`${serverLink}/books`, setRows);
  }, []);

  const handleEditClick = (id: GridRowId) => () => {
    console.log("id", id);
  };

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "bookId",
      headerName: "Id ",
      minWidth: 150,
      valueGetter: (value, row: Book) => row.bookID,
    },
    {
      field: "bookName",
      headerName: "Book Name",
      minWidth: 600,
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
          <Grid size={12}>
            <DataGridComponent
              columns={columns}
              rows={rows}
              getRowId={(row) => row.bookID}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
