const dayjs = require("dayjs");

const formatItemDates = (item) => {
  const plainItem = item.toObject ? item.toObject() : item;
  return {
    ...plainItem,
    dateLost: dayjs(plainItem.createdAt).format("DD-MM-YYYY"),
    updatedAt: dayjs(plainItem.updatedAt).format("DD-MM-YYYY"),
  };
};

module.exports = {
  formatItemDates,
};
