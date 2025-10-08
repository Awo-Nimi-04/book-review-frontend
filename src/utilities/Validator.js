export const REQUIRE_VALIDATOR = (val) => {
  return val.length > 0;
};

export const MIN_LENGTH_VALIDATOR = (val, len) => {
  return val.length >= len;
};

export const EMAIL_VALIDATOR = (data) => {
  return Boolean(
    String(data)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  );
};

export const MATCH_VALIDATOR = (val, match) => {
  return val === match;
};
