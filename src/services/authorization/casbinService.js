import { newEnforcer } from 'casbin';

const e = await newEnforcer('./basic_model.conf', './basic_model.csv');
module.exports = e;
