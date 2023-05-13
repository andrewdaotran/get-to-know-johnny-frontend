export const johnnyAge = () => {
  const todayDay = new Date().getDate();
  const todayMonth = new Date().getMonth() + 1;
  const todayYear = new Date().getFullYear();
  const johnnyDay = 1;
  const johnnyMonth = 9;
  const johnnyYear = 1995;

  const age = todayYear - johnnyYear - 1;
  if (
    todayMonth > johnnyMonth ||
    (todayMonth === johnnyMonth && todayDay >= johnnyDay)
  )
    return age + 1;

  return age;
};

export const johnnyNameAndAge = `Johnny, ${johnnyAge()}`;
