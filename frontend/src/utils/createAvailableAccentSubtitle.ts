const createAvailableAccentSubtitle = (availableAccents: any[]) => {
  return `Available in ${availableAccents.length} accent${
    availableAccents.length > 1 ? 's' : ''
  }`;
};

export default createAvailableAccentSubtitle;
