const StringUtils = {
  getUniqueKey(): string {
    return `key_${Math.floor(Math.random() * 1000000000)}`;
  }
};

export default StringUtils;
