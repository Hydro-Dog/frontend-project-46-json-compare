import extraTypeOf from '../utils/extraTypeOf.js';
import calcSpaces from '../utils/calcSpaces.js';


const getSpaces = (length) => Array.from({ length }, () => ' ').join('');

const prettifyValue = (value, spaces = 0) => {
  if (extraTypeOf(value) === 'object') {
    return Object.entries(value).map(([key, val]) => `\n${getSpaces(spaces + 2)}${key}: ${prettifyValue(val, spaces + 2)}`).join('');
  }
  return value;
};

const stylish = (tree, spaces = 0) => tree.children.map((item) => {
  if (item.type === 'tree') {
    return `  ${getSpaces(spaces)}${item.key}: \n${stylish(item, spaces + 2)}`;
  }

  if (item.type === 'leaf') {
    if (item.status === 'added') {
      return `${getSpaces(spaces)}+ ${item.key}: ${prettifyValue(item.value)} \n`;
    }

    if (item.status === 'removed') {
      return `${getSpaces(spaces)}- ${item.key}: ${prettifyValue(item.value)} \n`;
    }

    if (item.status === 'updated') {
      return `${getSpaces(spaces)}- ${item.key}: ${prettifyValue(item.prevValue)}\n${getSpaces(spaces)}+ ${item.key}: ${prettifyValue(item.newValue)} \n`;
    }

    if (item.status === 'same') {
      return `${getSpaces(spaces)}  ${item.key}: ${prettifyValue(item.value)} \n`;
    }
  }
}).join('');

export default stylish;
