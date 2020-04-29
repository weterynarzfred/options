import userFunctions from "./../userFunctions";
import pipe from './../pipe';

export default function getUserFunctionValue(userFunction, data, propName = 'value') {
  if (userFunction === undefined) return undefined;
  if (!userFunction.isUserFunction) return userFunction;

  if (propName === false) {
    return userFunctions[userFunction.functionId]({
      ...data,
      ...pipe.state
    });
  }

  if (userFunction[propName] === undefined) {
    userFunction[propName] = userFunctions[userFunction.functionId]({
      ...data,
      ...pipe.state
    });
  }

  return userFunction[propName];
}
