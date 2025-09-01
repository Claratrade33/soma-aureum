import * as aportService from '../services/aport.service';

export const createAport = async (req, res, next) => {
  try {
    const aport = await aportService.createAport(req.body);
    res.status(201).json(aport);
  } catch (err) {
    next(err);
  }
};

export const getAports = async (req, res, next) => {
  try {
    const aports = await aportService.listAports();
    res.json(aports);
  } catch (err) {
    next(err);
  }
};
