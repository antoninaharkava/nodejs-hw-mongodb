import { Router } from "express";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import * as contactsControllers from "../controllers/contacts.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import {
  contactSchema,
  partialContactSchema,
} from "../validations/contactsValidation.js";
import { authenticate } from '../middlewares/authenticate.js';

const contactsRouter = Router();


contactsRouter.use(authenticate);


contactsRouter.get("/", ctrlWrapper(contactsControllers.getContactsController));


contactsRouter.get("/:id", isValidId, ctrlWrapper(contactsControllers.getContactByIdController));


contactsRouter.post("/", validateBody(contactSchema), ctrlWrapper(contactsControllers.addContactController));


contactsRouter.put("/:id", isValidId, validateBody(contactSchema), ctrlWrapper(contactsControllers.upsertContactController));


contactsRouter.patch("/:id", isValidId, validateBody(partialContactSchema), ctrlWrapper(contactsControllers.patchContactController));


contactsRouter.delete("/:id", isValidId, ctrlWrapper(contactsControllers.deleteContactController));

export default contactsRouter;
