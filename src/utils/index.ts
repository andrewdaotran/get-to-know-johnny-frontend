export const time = () => {
  const today = new Date();
  const time = `${today.getHours()}: ${today.getMinutes()} `;
  return time;
};

export const defaultHobby = {
  hobby: "Add New Hobby",
  icon: "📲",
  isFocused: false,
  isHobbySubmitted: false,
  isMakingNewPuck: false,
};
