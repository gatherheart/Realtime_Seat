import _ from 'lodash';

export const parseFetchQueryObj = (query?) => {
  console.log('parse ', query);
  if (!query || _.isEmpty(query)) return '';

  const queries = [];

  const { where, limit, offset } = query;

  Object.keys(where).forEach(key => {
    queries.push(`where[${key}]=${where[key]}`);
  });
  limit && queries.push(`limit=${limit}`);
  offset && queries.push(`offset=${offset}`);

  return queries.join('&');
};

export const parseQuery = (query: string): any => {
  const onlyQueries = query.slice(1, query.length);

  const pairStrs = onlyQueries.split('&');

  const queryObj = {};

  pairStrs.forEach(str => {
    const [key, value] = str.split('=');
    queryObj[key] = value;
  });

  return queryObj;
};

export const numWithCommas = (num: number) => {
  const aboveDecimal = Math.floor(num);
  const belowDecimal = floorTwoDecimal(num - aboveDecimal);

  let result = aboveDecimal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (belowDecimal) {
    const belowDecimalStr = belowDecimal.toString();
    result += belowDecimalStr.slice(1, belowDecimalStr.length);
  }

  return result;
};

export const floorTwoDecimal = (num: number) => {
  return Math.floor(num * 100) / 100;
};
