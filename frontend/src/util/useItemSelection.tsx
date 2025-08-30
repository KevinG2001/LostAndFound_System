// src/context/ItemSelectionContext.tsx
import React, { createContext, useContext, useState } from "react";

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

  const handleAddToContainer = async () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item.");
      return;
    }

    try {
      const containerData = {
        listOfItemID: selectedItems,
        dateCreated: new Date(),
        AmountOfItems: selectedItems.length,
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
      alert(
        `Container ${newContainer.containerID} created with ${selectedItems.length} items!`
      );

      setSelectedItems([]);
    } catch (err) {
      console.error(err);
      alert("Error creating container");
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
