import ContactCollection from "../db/models/Contacts.js";

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = "name",
  sortOrder = "asc",
  filters = {},
}) => {
  const skip = (page - 1) * perPage;
  const sortDirection = sortOrder === "asc" ? 1 : -1;

  const contactsQuery = ContactCollection.find(filters)
    .sort({ [sortBy]: sortDirection })
    .skip(skip)
    .limit(perPage);

  const totalItems = await ContactCollection.countDocuments(filters);
  const contacts = await contactsQuery.exec();

  const totalPages = Math.ceil(totalItems / perPage);

  return {
    data: contacts,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
};

export const getContactById = (id) => ContactCollection.findById(id);

export const addContact = (payload) => ContactCollection.create(payload);

export const updateContact = async ({ _id, payload, options = {} }) => {
  const updatedContact = await ContactCollection.findOneAndUpdate(
    { _id },
    payload,
    {
      ...options,
      new: true,
      upsert: false,
    }
  );
  return updatedContact || null; 
};

export const deleteContact = (filter) => ContactCollection.findOneAndDelete(filter);
