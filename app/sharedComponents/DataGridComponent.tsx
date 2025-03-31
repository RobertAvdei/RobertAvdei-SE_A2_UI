import { DataGrid, type GridRowIdGetter } from "@mui/x-data-grid";

export interface DataGridComponentProps {
  columns: any;
  rows: any;
  initialSort?: string;
  getRowId: GridRowIdGetter<any>;
}

export const DataGridComponent = ({
  columns,
  rows,
  initialSort,
  getRowId,
  ...props
}: DataGridComponentProps) => {
  return (
    <DataGrid
      //   checkboxSelection
      getRowId={getRowId}
      rows={rows}
      columns={columns}
      getRowClassName={(params: any) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
        sorting: initialSort
          ? {
              sortModel: [
                {
                  field: initialSort,
                  sort: "desc",
                },
              ],
            }
          : {},
      }}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize
      density="compact"
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: "outlined",
              size: "small",
            },
            columnInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            operatorInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: "outlined",
                size: "small",
              },
            },
          },
        },
      }}
    />
  );
};
