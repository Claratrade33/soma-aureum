import Aport from '../models/aport.model';

export const createAport = async ({ username, aporte }) => {
  const virtual = aporte * 0.1;
  const tier = aporte >= 5000 ? 'Ouro' : aporte >= 2000 ? 'Prata' : 'Bronze';
  const aport = new Aport({ username, aporte, virtual, tier });
  return aport.save();
};

export const listAports = () => Aport.find().sort('-createdAt');
