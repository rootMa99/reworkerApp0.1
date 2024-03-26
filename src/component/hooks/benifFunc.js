export const selectCreator = (data) => {
  const returnedArr = [];
  console.log(data);
  if (data !== undefined) {
    data.length > 0 &&
      data.map((m) =>
        returnedArr.push({
          value: m,
          label: m,
        })
      );
  }

  return returnedArr;
};
