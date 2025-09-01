import { validationResult } from 'express-validator';

export default (schemas) => async (req, res, next) => {
  await Promise.all(
    Object.keys(schemas).map(key => schemas[key].run(req))
  );
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
