import { useState, useEffect, useRef } from "react";

interface NewItem {
  article: string;
  description: string;
  category: string;
  type: string;
  route: string;
  garage: string;
  notes: string;
  dateLost: string;
  status?: string;
  itemID?: string;
  imageUrl?: string;
}

interface Garage {
  garageName: string;
  routes: string[];
  [key: string]: any;
}

const useNewItem = () => {
  const [article, setArticle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [route, setRoute] = useState<string>("");
  const [garage, setGarage] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [dateLost, setDateLost] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [garages, setGarages] = useState<Garage[]>([]);
  const [routes, setRoutes] = useState<string[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
  const [typeOptions, setTypeOptions] = useState<string[]>([]);

  const [filteredGarages, setFilteredGarages] = useState<Garage[]>([]);
  const [filteredRoutes, setFilteredRoutes] = useState<string[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const [filteredTypes, setFilteredTypes] = useState<string[]>([]);

  const [showRouteDropdown, setShowRouteDropdown] = useState<boolean>(false);
  const [showCategoryDropdown, setShowCategoryDropdown] =
    useState<boolean>(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState<boolean>(false);
  const [showGarageDropdown, setShowGarageDropdown] = useState<boolean>(false);

  const [createdItem, setCreatedItem] = useState<NewItem | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const typeDropdownRef = useRef<HTMLDivElement>(null);
  const routeDropdownRef = useRef<HTMLDivElement>(null);
  const garageDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchGarages();
    fetchMetadata();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCategoryDropdown(false);
      }
      if (
        typeDropdownRef.current &&
        !typeDropdownRef.current.contains(event.target as Node)
      ) {
        setShowTypeDropdown(false);
      }
      if (
        routeDropdownRef.current &&
        !routeDropdownRef.current.contains(event.target as Node)
      ) {
        setShowRouteDropdown(false);
      }
      if (
        garageDropdownRef.current &&
        !garageDropdownRef.current.contains(event.target as Node)
      ) {
        setShowGarageDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setFilteredCategories(
      categoryOptions.filter((opt) =>
        opt.toLowerCase().includes(category.toLowerCase())
      )
    );
  }, [category, categoryOptions]);

  useEffect(() => {
    setFilteredTypes(
      typeOptions.filter((opt) =>
        opt.toLowerCase().includes(type.toLowerCase())
      )
    );
  }, [type, typeOptions]);

  const fetchGarages = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/garages/list`);
      const responseText = await res.text();
      if (res.ok) {
        const data = JSON.parse(responseText);
        setGarages(data);
        setFilteredGarages(data);
        const allRoutes = data.flatMap((garage: Garage) => garage.routes);
        setRoutes(allRoutes);
        setFilteredRoutes(allRoutes);
      } else {
        console.error(`Error: ${res.status} ${res.statusText}`);
      }
    } catch (err) {
      console.error("Error fetching garages:", err);
    }
  };

  const fetchMetadata = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/items/metadata`);
      if (!res.ok) throw new Error("Failed to fetch metadata");
      const data = await res.json();
      setCategoryOptions(data.categories);
      setTypeOptions(data.types);
      setFilteredCategories(data.categories);
      setFilteredTypes(data.types);
    } catch (err) {
      console.error("Failed to fetch categories/types:", err);
    }
  };

  const handleDropdownFilter = (value: string, options: string[]) =>
    options.filter((opt) => opt.toLowerCase().includes(value.toLowerCase()));

  const handleGarageFilter = (value: string, garageList: Garage[]) =>
    garageList.filter((garage) =>
      garage.garageName.toLowerCase().includes(value.toLowerCase())
    );

  const handleRouteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRoute(value);
    setFilteredRoutes(handleDropdownFilter(value, routes));
    setShowRouteDropdown(true);
  };

  const handleRouteSelect = (value: string) => {
    setRoute(value);
    setShowRouteDropdown(false);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
    setShowCategoryDropdown(true);
  };

  const handleCategorySelect = (value: string) => {
    setCategory(value);
    setShowCategoryDropdown(false);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
    setShowTypeDropdown(true);
  };

  const handleTypeSelect = (value: string) => {
    setType(value);
    setShowTypeDropdown(false);
  };

  const handleGarageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGarage(value);
    setFilteredGarages(handleGarageFilter(value, garages));
    setShowGarageDropdown(true);
  };

  const handleGarageSelect = (value: string) => {
    setGarage(value);
    setShowGarageDropdown(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };

  const createItem = async (): Promise<NewItem | null> => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("article", article);
    formData.append("description", description);
    formData.append("dateLost", dateLost);
    if (category) formData.append("category", category);
    if (type) formData.append("type", type);
    if (route) formData.append("route", route);
    if (garage) formData.append("garage", garage);
    if (notes) formData.append("notes", notes);
    formData.append("status", "Unclaimed");
    if (imageFile) formData.append("image", imageFile);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/items/create`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create new item");
      }

      const result = await res.json();
      setCreatedItem(result);
      return result;
    } catch (err: any) {
      console.error("Error creating item:", err);
      setError(err.message || "Error creating item");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    state: {
      article,
      description,
      category,
      type,
      route,
      garage,
      notes,
      dateLost,
    },
    filtered: {
      filteredGarages,
      filteredRoutes,
      filteredCategories,
      filteredTypes,
    },
    dropdowns: {
      showRouteDropdown,
      showCategoryDropdown,
      showTypeDropdown,
      showGarageDropdown,
      categoryDropdownRef,
      typeDropdownRef,
      routeDropdownRef,
      garageDropdownRef,
    },
    handlers: {
      handleRouteChange,
      handleRouteSelect,
      handleCategoryChange,
      handleCategorySelect,
      handleTypeChange,
      handleTypeSelect,
      handleGarageChange,
      handleGarageSelect,
      handleImageChange,
      setArticle,
      setDescription,
      setNotes,
      setDateLost,
      createItem,
    },
    loading,
    error,
  };
};

export default useNewItem;
