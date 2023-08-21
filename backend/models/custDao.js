import appDataSource from "./index.js";

export const createCust = async (
  guest_code,
  guest_name,
  guest_birth,
  guest_hp,
  guest_addr,
  guest_mail
) => {
  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    await queryRunner.query(
      `
      INSERT INTO cust(
        guest_code,
        guest_name,
        guest_birth
      )VALUES(
        ?,?,?
      )
      `,
      [guest_code, guest_name, guest_birth]
    );
    await queryRunner.query(
      `
      INSERT INTO cust_detail(
        guest_code,
        guest_hp,
        guest_addr,
        guest_mail
      )VALUES(
        ?,?,?,?
      )
      `,
      [guest_code, guest_hp, guest_addr, guest_mail]
    );
    const [result] = await queryRunner.query(
      `
      SELECT
        c.guest_code,
        c.guest_name,
        c.guest_birth,
        cd.guest_hp,
        cd.guest_addr,
        cd.guest_mail
      FROM
        cust c
      INNER JOIN
        cust_detail cd
      ON
        c.guest_code=cd.guest_code
      WHERE
        c.guest_code=?
      `,
      [guest_code]
    );
    return result;
  } catch (err) {
    console.error(err);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.commitTransaction();
    await queryRunner.release();
  }
};

export const updateCust = async (
  guest_code,
  guest_name,
  guest_birth,
  guest_hp,
  guest_addr,
  guest_mail
) => {
  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    const existingData = await queryRunner.query(
      `
      SELECT
        c.guest_name,
        c.guest_birth,
        cd.guest_hp,
        cd.guest_addr,
        cd.guest_mail
      FROM
        cust c
      INNER JOIN
        cust_detail cd
      ON
        c.guest_code=cd.guest_code
      WHERE
        c.guest_code=?
      `,
      [guest_code]
    );

    const {
      guest_name: existingName,
      guest_birth: existingBirth,
      guest_hp: existingHP,
      guest_addr: existingAddr,
      guest_mail: existingMail,
    } = existingData[0];

    const updatedFields = {
      guest_name: guest_name !== undefined ? guest_name : existingName,
      guest_birth: guest_birth !== undefined ? guest_birth : existingBirth,
      guest_hp: guest_hp !== undefined ? guest_hp : existingHP,
      guest_addr: guest_addr !== undefined ? guest_addr : existingAddr,
      guest_mail: guest_mail !== undefined ? guest_mail : existingMail,
    };

    await queryRunner.query(
      `
      UPDATE
        cust
      SET
        guest_name=?,
        guest_birth=?
      WHERE
        guest_code=?
      `,
      [updatedFields.guest_name, updatedFields.guest_birth, guest_code]
    );
    await queryRunner.query(
      `
      UPDATE
        cust_detail
      SET
        guest_hp=?,
        guest_addr=?,
        guest_mail=?
      WHERE
        guest_code=?
      `,
      [
        updatedFields.guest_hp,
        updatedFields.guest_addr,
        updatedFields.guest_mail,
        guest_code,
      ]
    );
    const [result] = await queryRunner.query(
      `
      SELECT
        c.guest_code,
        c.guest_name,
        c.guest_birth,
        cd.guest_hp,
        cd.guest_addr,
        cd.guest_mail
      FROM
        cust c
      INNER JOIN
        cust_detail cd
      ON
        c.guest_code=cd.guest_code
      WHERE
        c.guest_code=?
      `,
      [guest_code]
    );
    await queryRunner.commitTransaction();
    return result;
  } catch (err) {
    console.error(err);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
};

export const deleteCust = async (guest_code) => {
  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    await queryRunner.query(
      `
      DELETE FROM
        cust_detail
      WHERE
        guest_code=?
      `,
      [guest_code]
    );

    await queryRunner.query(
      `
      DELETE FROM
        cust
      WHERE
        guest_code=?
      `,
      [guest_code]
    );
  } catch (err) {
    console.error(err);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.commitTransaction();
    await queryRunner.release();
  }
};

export const getCust = async () => {
  const result = await appDataSource.query(
    `
    SELECT
    c.guest_code,
    c.guest_name,
    c.guest_birth,
    cd.guest_hp,
    cd.guest_addr,
    cd.guest_mail
  FROM
    cust c
  INNER JOIN
    cust_detail cd
  ON
    c.guest_code=cd.guest_code
    `
  );
  return result;
};
