import { Box, Grid, Modal, Typography } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import type { ReadingHabits, User } from "~/constants/interfaces";
import { fetchValue } from "~/constants/utils";
import { DataGridComponent } from "~/sharedComponents/DataGridComponent";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export interface UserModalProps {
  open: boolean;
  handleClose: Function;
  user: User;
}

export const UserModal = ({
  open,
  handleClose,
  user,
  ...props
}: UserModalProps) => {
  const [habits, setHabits] = useState([] as ReadingHabits[]);
  useEffect(() => {
    if (open && user.userID) {
      const serverLink = import.meta.env.VITE_SERVER_LINK;
      fetchValue(`${serverLink}/users/habit/${user.userID}`, setHabits);
    }
  }, [open, user.userID]);

  const columns: GridColDef<(typeof habits)[number]>[] = [
    { field: "habitID", headerName: "Habit ID", minWidth: 90 },
    {
      field: "pagesRead",
      headerName: "Pages Read",
      minWidth: 90,
    },
    {
      field: "bookName",
      headerName: "Book",
      minWidth: 400,
      valueGetter: (value, row: ReadingHabits) => row.book?.bookName || "",
    },
  ];

  return (
    <Modal
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid
          container
          spacing={3}
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {`User ${user.userID}`}
            </Typography>
          </Grid>
          <Grid>
            <Typography variant="h6" component="h2">{`Gender: ${user.gender}`}</Typography>
          </Grid>
          <Grid>
            <Typography variant="h6" component="h2">{`Age: ${user.age}`}</Typography>
          </Grid>
        </Grid>
        <br />
        <DataGridComponent
          columns={columns}
          rows={habits}
          getRowId={(row) => row.habitID}
          CustomNoRowMessage="No habits"
        />
      </Box>
    </Modal>
  );
};
