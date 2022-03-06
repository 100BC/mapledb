interface Links {
  apple?: string;
  bandcamp?: string;
  spotify?: string;
  youtube?: string;
}

const validateLinks = (links: Links) => {
  if (!Object.values(links).some((x) => x !== '')) {
    return false;
  }
  return true;
};

export default validateLinks;
