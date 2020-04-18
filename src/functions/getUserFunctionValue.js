import { userFunctions } from "./prepareOptions";

export default function getUserFunctionValue(userFunction, options, option) {
  if (userFunction === undefined) return undefined;
  if (!userFunction.isUserFunction) return userFunction;
  
  return userFunctions[userFunction.functionId]({option, options});
}
