import * as contactServices from "../services/contacts.js";
import createHttpError from "http-errors";

export const getContactsController = async (req, res) => {
  const { page = 1, perPage = 10, sortBy = "name", sortOrder = "asc", type, isFavourite } = req.query;

  const filters = {};
  if (type) filters.contactType = type;
  if (isFavourite) filters.isFavourite = isFavourite === "true";

  const data = await contactServices.getContacts({
    page: Number(page),
    perPage: Number(perPage),
    sortBy,
    sortOrder,
    filters,
  });

  res.json({
    status: "success",
    message: "Successfully found contacts!",
    data: data.data,
    pagination: {
      page: data.page,
      perPage: data.perPage,
      totalItems: data.totalItems,
      totalPages: data.totalPages,
      hasPreviousPage: data.hasPreviousPage,
      hasNextPage: data.hasNextPage,
    },
  });

};

export const getContactByIdController = async (req, res) => {
  const { id: _id } = req.params;
  const contact = await contactServices.getContactById(_id);
  if (!contact) {
    throw createHttpError(404, "Contact not found");
  }
  res.json({
    status: "success",
    message: `Successfully found contact with id ${_id}!`,
    data: contact,
  });
};

export const addContactController = async (req, res) => {
  const contact = await contactServices.addContact(req.body);
  res.status(201).json({
    status: "success",
    message: "Successfully created a contact!",
    data: contact,
  });
};

export const upsertContactController = async (req, res) => {
  const { id: _id } = req.params;
  const updatedContact = await contactServices.updateContact({ _id, payload: req.body });
  if (!updatedContact) {
    throw createHttpError(404, "Contact not found");
  }
  res.json({
    status: "success",
    message: "Successfully updated the contact!",
    data: updatedContact.data,
  });
};

export const patchContactController = async (req, res) => {
  const { id: _id } = req.params;
  const updatedContact = await contactServices.updateContact({
    _id,
    payload: req.body,
  });
  if (!updatedContact) {
    throw createHttpError(404, "Contact not found");
  }
  res.json({
    status: "success",
    message: "Successfully patched the contact!",
    data: updatedContact, 
  });
};


export const deleteContactController = async (req, res) => {
  const { id: _id } = req.params;
  const deletedContact = await contactServices.deleteContact({ _id });
  if (!deletedContact) {
    throw createHttpError(404, "Contact not found");
  }
  res.status(204).send();
};
