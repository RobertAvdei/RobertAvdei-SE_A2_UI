import { useEffect, useState, type FC } from "react";
import { Grid, Typography } from "@mui/material";
import { DataGridComponent } from "~/sharedComponents/DataGridComponent";
import {
  GridActionsCellItem,
  type GridColDef,
  type GridRowId,
} from "@mui/x-data-grid";
import type { ReadingHabits } from "~/constants/interfaces";
import NumberFlow, { continuous } from "@number-flow/react";
import { fetchValue } from "~/constants/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridBox } from "~/sharedComponents/GridBox";

export function Welcome() {
  const [meanAge, setMeanAge] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [bookReaders, setBookReaders] = useState(0);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const serverLink = import.meta.env.VITE_SERVER_LINK;
    fetchValue(`${serverLink}/users/mean`, setMeanAge);
    fetchValue(`${serverLink}/habits/totalReadPages`, setTotalPages);
    fetchValue(`${serverLink}/users/getMultiReaders`, setBookReaders);
    fetchValue(`${serverLink}/habits`, setRows);
  }, []);

  const handleDeleteClick = (id: GridRowId) => () => {
    console.log("id", id);
  };

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "habitID", headerName: "ID", minWidth: 90 },
    {
      field: "userID",
      headerName: "User ",
      minWidth: 90,
      valueGetter: (value, row: ReadingHabits) => row.user.userID,
    },
    {
      field: "pagesRead",
      headerName: "Pages Read",
      minWidth: 90,
    },
    {
      field: "bookName",
      headerName: "Book",
      minWidth: 450,
      valueGetter: (value, row: ReadingHabits) => row.book.bookName,
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
            icon={<DeleteIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const dashboardContent = [
    { title: "Average User Age", content: `Years`, number: meanAge },
    { title: "Total Pages Read", content: `Pages`, number: totalPages },
    { title: "Multi-Book Readers", content: `Readers`, number: bookReaders },
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
          
          {dashboardContent.map((item, index) => (
            <GridBox key={index}>
              <BoxContent {...item} />
            </GridBox>
          ))}
          <Grid size={12}>
            <DataGridComponent
              columns={columns}
              rows={rows}
              getRowId={(row) => row.habitID}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

interface BoxContentProps {
  title: string;
  content: string;
  number: number;
}

const BoxContent = ({ title, content, number, ...props }: BoxContentProps) => {
  return (
    <>
      <p className="text-center">{title}</p>
      <Typography variant="h2" className="text-center">
        <NumberFlow
          value={number}
          suffix={` ${content}`}
          plugins={[continuous]}
        />
      </Typography>
    </>
  );
};
