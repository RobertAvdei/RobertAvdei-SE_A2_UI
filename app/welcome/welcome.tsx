import { useEffect, useState, type FC } from "react";
import axios from "axios";
import { Box, Grid, Typography } from "@mui/material";
import { DataGridComponent } from "~/sharedComponents/DataGridComponent";
import type { GridColDef } from "@mui/x-data-grid";
import type { ReadingHabits } from "~/constants/interfaces";
import NumberFlow, { continuous } from '@number-flow/react'

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

  function fetchValue(url: string, callBack: Function) {
    axios
      .get(url)
      .then((response) => callBack(response.data))
      .catch((response) => onError(response))
      .finally(() => console.log("Finally done"));
  }

  function onError(response: any) {
    console.log(response);
  }

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "habitID", headerName: "ID", minWidth: 150 },
    {
      field: "userID",
      headerName: "User ",
      minWidth: 150,
      valueGetter: (value, row: ReadingHabits) => row.user.userID,
    },
    {
      field: "pagesRead",
      headerName: "Pages Read",
      minWidth: 250,
    },
    {
      field: "bookName",
      headerName: "Book",
      minWidth: 450,
      valueGetter: (value, row: ReadingHabits) => row.book.bookName,
    },
  ];

  const dashboardContent = [
    { title: "Average User Age", content: `Years`, number:meanAge },
    { title: "Total Pages Read", content: `Pages`, number:totalPages },
    { title: "Multi-Book Readers", content: `Readers`, number:bookReaders},
  ];

  return (
    <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
      <div className="max-w-[1200px] w-full space-y-6 px-4">
        <Grid
          container
          spacing={3}
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {dashboardContent.map((item,index) => (
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

interface GridBoxProps {
  children: React.ReactNode;
  size?: number;
}

const GridBox = ({ children, size = 4, ...props }: GridBoxProps) => {
  return (
    <Grid alignItems={"center"} justifyItems={"center"} size={size}>
      <Box
        width={"100%"}
        className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4 "
      >
        {children}
      </Box>
    </Grid>
  );
};

interface BoxContentBox {
  title: string;
  content: string;
  number: number
}

const BoxContent = ({ title, content, number, ...props }: BoxContentBox) => {
  return (

    <>
      <p className="text-center">{title}</p>
      <Typography variant="h1" className="text-center">
       <NumberFlow value={number} suffix={` ${content}` } plugins={[continuous]}/>
      </Typography>
    </>
  );
};
