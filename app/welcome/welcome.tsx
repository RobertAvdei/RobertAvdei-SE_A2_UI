import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid } from "@mui/material";

export function Welcome() {
  const [employees, setEmployee] = useState([]);

  const [user1, setUser1] = useState("Im user 1");

  let user2 = "Im user 2";

  console.log(user1);

  user2 = "I have changed";

  useEffect(() => setUser1("I have changed"), []);

  // useEffect(
  //     () => getEmployees(), []
  // )

  function getEmployees() {
    console.log("Fetching Employee");
    axios
      .get("http://localhost:8080/users")
      .then((response) => onSuccess(response))
      .catch((response) => onError(response))
      .finally(() => console.log("Finally done"));
  }

  function onSuccess(response: any) {
    console.log(response);
    setEmployee(response.data);
  }

  function onError(response: any) {
    console.log(response);
  }

  return (
    <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
      <div className="max-w-[900px] w-full space-y-6 px-4">
        <Grid
          minWidth={"900px"}
          container
          spacing={2}
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid alignItems={"center"} justifyItems={'center'} size={4}>
            <Box width={'100%'} className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4 " >
              <p className="text-center"> Average User Age</p>
            </Box>
          </Grid>
          <Grid alignItems={"center"} justifyItems={"center"} size={4}>
          <Box width={'100%'} className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4 " >
              <p className="text-center">Total Pages Read</p>
            </Box>
          </Grid>
          <Grid alignItems={"center"} justifyItems={"center"} size={4}>
          <Box width={'100%'} className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4 " >
              <p className="text-center">Multi-Book Readers</p>
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

function Example2() {
  return <p> Hello world</p>;
}
const Example = () => {
  return <p> Hello world</p>;
};
