export const selectCreator = (data) => {
  const returnedArr = [];

  data.length > 0 &&
    data.map((m) =>
      returnedArr.push({
        value: m,
        label: m,
      })
    );

  return returnedArr;
};
