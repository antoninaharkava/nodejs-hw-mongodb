// import express from 'express';
// import ctrlWrapper from '../utils/ctrlWrapper.js';
// import {
//     registerUserSchema,
//     loginUserSchema,
//     requestResetEmailSchema,
// } from '../validations/authValidation.js';
// import {
//     registerUserController,
//     loginUserController,
//     logoutUserController,
//     refreshUsersSessionController,
//     requestResetEmailController,
// } from '../controllers/auth.js';
// import { validateBody } from '../middlewares/validateBody.js';

// const router = express.Router();
// const jsonParser = express.json();

// router.post(
//     '/register',
//     jsonParser,
//     validateBody(registerUserSchema),
//     ctrlWrapper(registerUserController),
// );

// router.post(
//     '/login',
//     jsonParser,
//     validateBody(loginUserSchema),
//     ctrlWrapper(loginUserController),
// );

// router.post('/logout', ctrlWrapper(logoutUserController));

// router.post('/refresh', ctrlWrapper(refreshUsersSessionController));

// router.post(
//     '/send-reset-email',
//     jsonParser,
//     validateBody(requestResetEmailSchema),
//     ctrlWrapper(requestResetEmailController),
// );

// export default router;

import express from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import {
  registerUserSchema,
  loginUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
  loginWithGoogleOAuthSchema
} from '../validations/authValidation.js';
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUsersSessionController,
  requestResetEmailController,
  resetPasswordController,
  getGoogleOAuthUrlController,
  loginWithGoogleController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));

router.post(
  '/confirm-oauth',
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(loginWithGoogleController),
);

router.post('/register', jsonParser, validateBody(registerUserSchema), ctrlWrapper(registerUserController));

router.post('/login', jsonParser, validateBody(loginUserSchema), ctrlWrapper(loginUserController));

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshUsersSessionController));

router.post('/send-reset-email', jsonParser, validateBody(requestResetEmailSchema), ctrlWrapper(requestResetEmailController));

router.post('/reset-pwd', jsonParser, validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController));

export default router;
