import { catchAsync } from "../utils/error.js";
import * as custService from "../services/custService.js";

export const createCust = catchAsync(async (req, res) => {
  const {
    guest_code,
    guest_name,
    guest_birth,
    guest_hp,
    guest_addr,
    guest_mail,
  } = req.body;

  const data = await custService.createCust(
    guest_code,
    guest_name,
    guest_birth,
    guest_hp,
    guest_addr,
    guest_mail
  );
  res.status(201).json({ data });
});

export const updateCust = catchAsync(async (req, res) => {
  const { guest_code } = req.params;
  const { guest_name, guest_birth, guest_hp, guest_addr, guest_mail } =
    req.body;

  const data = await custService.updateCust(
    guest_code,
    guest_name,
    guest_birth,
    guest_hp,
    guest_addr,
    guest_mail
  );

  res.status(200).json({ data });
});

export const deleteCust = catchAsync(async (req, res) => {
  const { guest_code } = req.params;
  await custService.deleteCust(guest_code);

  res.status(200).json({ message: "data delete success" });
});
