export const selectCreator = (data) => {
  const returnedArr = [];

  data.map((m) =>
    returnedArr.push({
      value: m,
      label: m,
    })
  );

  return returnedArr;
};
