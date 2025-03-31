import { Box, Divider, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import type { Book, ReadingHabits, User } from "~/constants/interfaces";
import { fetchValue } from "~/constants/utils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export interface BookModalProps {
  open: boolean;
  handleClose: Function;
  book: Book;
}

export const BookModal = ({
  open,
  handleClose,
  book,
  ...props
}: BookModalProps) => {
  const [readers, setReaders] = useState(0);
  useEffect(() => {
    if (open && book.bookID) {
      const serverLink = import.meta.env.VITE_SERVER_LINK;
      fetchValue(`${serverLink}/books/readerCount/${book.bookID}`, setReaders);
    }
  }, [open, book.bookID]);

  const hasRead =
    readers === 1
      ? `${readers} Reader has read this book`
      : `${readers} Readers have read this book`;

  return (
    <Modal
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {`Book ${book.bookID}`}
        </Typography>
        <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
        <Typography>{`${book.bookName}`}</Typography>
        <br />
        <Typography>{hasRead}</Typography>
      </Box>
    </Modal>
  );
};
