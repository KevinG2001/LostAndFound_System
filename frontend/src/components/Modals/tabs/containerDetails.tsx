import React, { useMemo } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import TableView from "../../Views/TableView";
import { ContainerData } from "../../../util/types/containerType";
import { ItemData } from "../../../util/types/itemTypes";
import useList from "../../../util/useList";

interface Props {
  data: ContainerData;
}

const ContainerDetailsTab = ({ data }: Props) => {
  const { items: allItems } = useList("items", "list");
  const containerItems: ItemData[] = useMemo(() => {
    if (!data.listOfItemID || data.listOfItemID.length === 0) return [];
    return allItems.filter((item) => data.listOfItemID.includes(item.itemID));
  }, [allItems, data.listOfItemID]);

  const loading = allItems.length === 0;

  return (
    <Box>
      <Typography variant="h6">Container Details</Typography>
      <Typography>ID: {data.containerID}</Typography>
      <Typography>
        Date Created: {new Date(data.dateCreated).toLocaleString()}
      </Typography>
      <Typography>Amount of Items: {data.amountOfItems}</Typography>

      {loading ? (
        <CircularProgress />
      ) : containerItems.length > 0 ? (
        <TableView
          columns={[
            { header: "Item ID", accessor: "itemID" },
            { header: "Article", accessor: "article" },
            { header: "Description", accessor: "description" },
            { header: "Category", accessor: "category" },
            { header: "Status", accessor: "status" },
          ]}
          data={containerItems}
          onRowClick={(item) => console.log("Clicked item:", item)}
        />
      ) : (
        <Typography>No items in this container</Typography>
      )}
    </Box>
  );
};

export default ContainerDetailsTab;
