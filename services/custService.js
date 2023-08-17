import * as custDao from "../models/custDao.js";

export const createCust = async (
  guest_code,
  guest_name,
  guest_birth,
  guest_hp,
  guest_addr,
  guest_mail
) => {
  return await custDao.createCust(
    guest_code,
    guest_name,
    guest_birth,
    guest_hp,
    guest_addr,
    guest_mail
  );
};
export const updateCust = async (
  guest_code,
  guest_name,
  guest_birth,
  guest_hp,
  guest_addr,
  guest_mail
) => {
  return await custDao.updateCust(
    guest_code,
    guest_name,
    guest_birth,
    guest_hp,
    guest_addr,
    guest_mail
  );
};
export const deleteCust = async (guest_code) => {
  return await custDao.deleteCust(guest_code);
};

// export const signup = async (email, password, name) => {
//   await checkValidationEmail(email);
//   await checkValidationPassword(password);

//   const checkDuplicateEmail = await userDao.checkExistUserByEmail(email);
//   if (checkDuplicateEmail) {
//     const error = new Error("이미 존재하는 email 입니다.");
//     error.statusCode = 400;
//     throw error;
//   }
//   const salt = parseInt(process.env.SALT);

//   const hashedPassword = await bcrypt.hash(password, salt);
//   const createUser = await userDao.createUser(email, hashedPassword, name);
//   return createUser;
// };

// export const login = async (email, password) => {
//   await checkValidationEmail(email);
//   await checkValidationPassword(password);

//   const checkExistUSer = await userDao.checkExistUserByEmail(email);
//   if (!checkExistUSer) {
//     const error = new Error("존재하지 않는 email 입니다.");
//     error.statusCode = 400;
//     throw error;
//   }

//   const hashedPassword = await userDao.getPasswordByEmail(email);
//   const checkHash = await bcrypt.compare(password, hashedPassword);

//   if (!checkHash) {
//     const error = new Error("잘못된 비밀번호 입니다.");
//     error.statusCode = 400;
//     throw error;
//   }

//   return accessToken(email);
// };

// export const accessToken = async (email) => {
//   const secterKey = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
//   const userId = await userDao.getUserIdByEmail(email);

//   const payload = {
//     userId: userId,
//     userEmail: email,
//     iss: "wanted_backend_internship",
//   };

//   return jwt.sign(payload, secterKey, { expiresIn: "1h" });
// };
