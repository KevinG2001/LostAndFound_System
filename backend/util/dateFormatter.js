const dayjs = require("dayjs");

const safeFormat = (date) => (date ? dayjs(date).format("DD-MM-YYYY") : null);

const formatItemDates = (doc) => {
  const plain = doc.toObject ? doc.toObject() : doc;
  return {
    ...plain,
    dateCreated: safeFormat(plain.dateCreated),
    updatedAt: safeFormat(plain.updatedAt),
    dateLost: plain.dateLost ? safeFormat(plain.dateLost) : undefined,
  };
};

module.exports = { formatItemDates };
