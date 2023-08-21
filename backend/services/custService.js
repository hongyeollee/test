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

export const getCust = async () => {
  return await custDao.getCust();
};
