import jsSha from "jssha";

const SALT = process.env.SALT;

export const generateHash = (string) => {
  const shaObj = new jsSha("SHA-512", "TEXT", { encoding: "UTF8" });
  const unhashedCookieString = `${string}-${SALT}`;
  shaObj.update(unhashedCookieString);
  const hashedCookieString = shaObj.getHash("HEX");
  return hashedCookieString;
};

// compares input(string) with expected hash, return bool
export const verifyHash = (input, hashExpected) => {
  const g = generateHash(input);
  return g === hashExpected;
};
