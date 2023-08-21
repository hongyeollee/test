-- migrate:up
CREATE TABLE cust (
  guest_code VARCHAR(255) PRIMARY KEY,
  guest_name VARCHAR(1000),
  guest_birth VARCHAR(1000)
);

-- migrate:down
drop table cust
