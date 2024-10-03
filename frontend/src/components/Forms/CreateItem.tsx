import { useState } from "react";
import Style from "../../styles/pages/createItem.module.scss";
function CreateItem() {
  const [item, setItem] = useState({
    description: "",
    type: "",
    category: "",
    route: "",
    garage: "",
    notes: "",
    dateLost: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(item);

    try {
      const response = await fetch("http://localhost:4000/items/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Item created successfully:", data);
        setItem({
          description: "",
          type: "",
          category: "",
          route: "",
          garage: "",
          notes: "",
          dateLost: "",
        });
      } else {
        console.error("Failed to create item");
      }
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  return (
    <div className={Style.container}>
      <h2>Create item</h2>
      <form onSubmit={handleSubmit} className={Style.formContainer}>
        <div className={Style.formRow}>
          <div className={Style.innerRow}>
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={item.description}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className={Style.formRow}>
          <div className={Style.innerRow}>
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={item.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className={Style.innerRow}>
            <label>Type:</label>
            <input
              type="text"
              name="type"
              value={item.type}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={Style.formRow}>
          <div className={Style.innerRow}>
            <label>Route:</label>
            <input
              type="text"
              name="route"
              value={item.route}
              onChange={handleChange}
            />
          </div>

          <div className={Style.innerRow}>
            <label>Garage:</label>
            <input
              type="text"
              name="garage"
              value={item.garage}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={Style.formRow}>
          <div className={Style.innerRow}>
            <label>Notes:</label>
            <input
              type="text"
              name="notes"
              value={item.notes}
              onChange={handleChange}
            />
          </div>

          <div className={Style.innerRow}>
            <label>Date Lost:</label>
            <input
              type="date"
              name="dateLost"
              value={item.dateLost}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className={Style.submitBtn}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateItem;
