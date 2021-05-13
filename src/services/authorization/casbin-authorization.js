const { newEnforcer } = require('casbin');
const pathToModel = './src/services/authorization/basic_model.conf';
const pathToPolicy = './src/services/authorization/basic_model.csv';

exports.authorize = async (subj, obj, act) => {
    const enforcer = await newEnforcer(pathToModel, pathToPolicy);
    const allowed = await enforcer.enforce(subj, obj, act);
    return allowed;
};
