import { Grid } from "@mui/material";
import {
  GridActionsCellItem,
  GridRowModes,
  type GridColDef,
  type GridRowId,
  type GridRowModesModel,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import type { Book, User } from "~/constants/interfaces";
import { fetchValue, postValue } from "~/constants/utils";
import { DataGridComponent } from "~/sharedComponents/DataGridComponent";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { BookModal } from "./BookModal";

export const BooksContent = () => {
  const [rows, setRows] = useState([] as Book[]);
  const [showModal, setShowModal] = useState(false);
  const [currentBook, setCurrentBook] = useState({} as Book);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  useEffect(() => {
    const serverLink = import.meta.env.VITE_SERVER_LINK;
    fetchValue(`${serverLink}/books`, setRows);
  }, []);

  const handleOpenClick = (id: GridRowId, row: Book) => () => {
    setShowModal(true);
    setCurrentBook(row);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentBook({} as Book);
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId,row: Book) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    const serverLink = import.meta.env.VITE_SERVER_LINK;
    postValue(`${serverLink}/books/${id}`,{ bookName: row.bookName, bookID: row.bookID } as Book,()=> alert('Book Title updated!'))
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.bookID === id);
    // @ts-ignore
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.bookID !== id));
    }
  };

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "bookID",
      headerName: "Id ",
      minWidth: 150,
      valueGetter: (value, row: Book) => row.bookID,
    },
    {
      field: "bookName",
      headerName: "Book Name",
      editable: true,
      minWidth: 600,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id, row }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id,row)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<OpenInFullIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleOpenClick(id, row)}
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
        <BookModal
          book={currentBook}
          open={showModal}
          handleClose={handleModalClose}
        />
      </div>
    </div>
  );
};
