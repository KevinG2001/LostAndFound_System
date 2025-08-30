// src/context/ItemSelectionContext.tsx
import React, { createContext, useContext, useState } from "react";
import { useSnackbar } from "notistack";

interface ItemSelectionContextType {
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  handleAddToContainer: () => void;
}

const ItemSelectionContext = createContext<ItemSelectionContextType | null>(
  null
);

export const useItemSelection = () => {
  const context = useContext(ItemSelectionContext);
  if (!context)
    throw new Error("useItemSelection must be used within provider");
  return context;
};

export const ItemSelectionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { enqueueSnackbar } = useSnackbar(); // <-- use toast

  const handleAddToContainer = async () => {
    if (selectedItems.length === 0) {
      enqueueSnackbar("Please select at least one item.", {
        variant: "warning",
      });
      return;
    }

    try {
      const containerData = {
        listOfItemID: selectedItems,
        dateCreated: new Date(),
        amountOfItems: selectedItems.length,
      };

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/containers/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(containerData),
        }
      );

      if (!res.ok) throw new Error("Failed to create container");

      const newContainer = await res.json();
      enqueueSnackbar(
        `Container ${newContainer.containerID} created with ${selectedItems.length} items!`,
        { variant: "success" }
      );

      setSelectedItems([]);
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Error creating container", { variant: "error" });
    }
  };

  return (
    <ItemSelectionContext.Provider
      value={{ selectedItems, setSelectedItems, handleAddToContainer }}
    >
      {children}
    </ItemSelectionContext.Provider>
  );
};
