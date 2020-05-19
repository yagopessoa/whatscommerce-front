import { camelCase } from 'lodash';

export const capitalize = s =>
  s ? s.toLowerCase().replace(/(?:^|\s)\S/g, a => a.toUpperCase()) : s;

export const convertToCamelCase = object => {
  if (!!object && typeof object === 'object') {
    let convertedObject = {};

    if (Array.isArray(object)) {
      convertedObject = object.map(convertToCamelCase);
    } else {
      Object.keys(object).forEach(key => {
        const newKey = camelCase(key);
        convertedObject[newKey] = convertToCamelCase(object[key]);
      });
    }
    return convertedObject;
  }
  return object;
};

export const cleanCnpj = cnpj =>
  cnpj ? cnpj.split('.').join('').split('/').join('').split('-').join('') : null;
