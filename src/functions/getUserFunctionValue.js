import userFunctions from "./../userFunctions";
import pipe from './../pipe';

export default function getUserFunctionValue(userFunction, data, propName = 'value', reset = false) {
  if (userFunction === undefined) return undefined;
  if (!userFunction.isUserFunction) return userFunction;

  if (propName === false) {
    return userFunctions[userFunction.functionId](data);
  }

  if (reset || userFunction[propName] === undefined) {
    userFunction[propName] = userFunctions[userFunction.functionId]({
      ...data,
      ...pipe.state
    });
  }
  return userFunction[propName];
}
