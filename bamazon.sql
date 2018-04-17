CREATE DATABASE bamazon;

USE bamazon;
CREATE TABLE Products (
    item_id INT(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT(10),
    Primary Key (item_id)
);

INSERT INTO Products(product_name,department_name,price,stock_quantity) VALUES('Spiral Notebook', 'School Supplies',1.48,100);
/* insert more products */
INSERT INTO Products(product_name,department_name,price,stock_quantity) VALUES('Composition Book', 'School Supplies',3.29,100);
INSERT INTO Products(product_name,department_name,price,stock_quantity) VALUES('Pencil Pouch', 'School Supplies',2.69,100);
INSERT INTO Products(product_name,department_name,price,stock_quantity) VALUES('Paper Folder', 'School Supplies',1.49,100);
INSERT INTO Products(product_name,department_name,price,stock_quantity) VALUES('Crayola Crayons', 'School Supplies',2.73,100);
INSERT INTO Products(product_name,department_name,price,stock_quantity) VALUES('ElmerGlue Stick', 'School Supplies',0.99,100);
INSERT INTO Products(product_name,department_name,price,stock_quantity) VALUES('Pencil#2 Yellow', 'School Supplies',2.49,100);
INSERT INTO Products(product_name,department_name,price,stock_quantity) VALUES('Expo Black Marker', 'School Supplies',2.63,100);
INSERT INTO Products(product_name,department_name,price,stock_quantity) VALUES('Self Stick Notes', 'School Supplies',1.77,100);
INSERT INTO Products(product_name,department_name,price,stock_quantity) VALUES('Crayola Colored Pencils', 'School Supplies',1.49,100);
INSERT INTO Products(product_name,department_name,price,stock_quantity) VALUES('Highlighter', 'School Supplies',0.89,100);

/*DELETE FROM Products WHERE item_id=12*/

