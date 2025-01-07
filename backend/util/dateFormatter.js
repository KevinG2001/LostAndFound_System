const dayjs = require("dayjs");

const formatItemDates = (item) => {
  const plainItem = item.toObject ? item.toObject() : item;
  return {
    ...plainItem,
    dateLost: dayjs(plainItem.dateLost).format("DD-MM-YYYY"),
    dateCreated: dayjs(plainItem.dateCreated).format("DD-MM-YYYY"),
    updatedAt: dayjs(plainItem.updatedAt).format("DD-MM-YYYY"),
  };
};

module.exports = {
  formatItemDates,
};
