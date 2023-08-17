-- migrate:up
CREATE TABLE cust_detail (
  guest_code VARCHAR(255) PRIMARY KEY,
  guest_hp VARCHAR(1000),
  guest_addr VARCHAR(1000),
  guest_mail VARCHAR(1000),
  FOREIGN KEY (guest_code) REFERENCES cust(guest_code)
);

-- migrate:down
drop table cust_detail
