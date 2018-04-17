var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',

    password: 'root',
    database: 'bamazon',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

//test connection
// connection.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
//     connection.end();
// });

function managerAction() {
    inquirer.prompt([{
        name: 'action',
        type: 'list',
        message: 'List the task to do.',
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Quit'],
    }]).then(function (answers) {
        //based on manager's choice, run function
        switch (answers.action) {
            case 'View Products for Sale':
                viewProducts();
                break;
            case 'View Low Inventory':
                viewInventory();
                break;
            case 'Add to Inventory':
                addStock();
                break;
            case 'Add New Product':
                addProduct();
                break;
            case 'Quit':
             connection.end(); 
        }
    });
};//End managerAction
managerAction();

// Display all products for sale
var viewProducts = function () {
    connection.query('SELECT * FROM Products', function (error, response) {
        if (error) { console.log(error) }
        var table = new Table({
            head: ['Item ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity'],
            colWidths: [10, 30, 18, 10, 18]
        });
        for (var i = 0; i < response.length; i++) {
            table.push(
                [response[i].item_id, response[i].product_name, response[i].department_name, response[i].price, response[i].stock_quantity]
            );
        }
        console.log(table.toString());
        managerAction();
    });
}; //End of displayProducts

var viewInventory = function () {
    connection.query('SELECT * FROM Products WHERE stock_quantity <5', function (error, response) {
        var table = new Table({
            head: ['Item ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity'],
            colWidths: [10, 30, 18, 10, 18]
        });
        for (var i = 0; i < response.length; i++) {
            table.push(
                [response[i].item_id, response[i].product_name, response[i].department_name, response[i].price, response[i].stock_quantity]
            );
        }
        console.log(table.toString());
        managerAction();
    });
};

var addStock = function () {
    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "What is the item number that you would like to stock up?"
        }, {
            name: "Quantity",
            tye: "input",
            message: "List the quantity to add."
        },
    ]).then(function (answers) {
        var quantityAdded = answers.Quantity;
        var IDofStock = answers.ID;
        restockProducts(IDofStock, quantityAdded);
    });
}; //end of addStock

function restockProducts(id, amount) {
    connection.query('SELECT * FROM Products WHERE item_id = ?', id, function (error, response) {
        if (error) { console.log(error) }
        var updateDb = 'UPDATE Products SET stock_quantity = stock_quantity  + ' + amount + ' WHERE item_id = ?';
        //console.log(id,amount, updateDb);
        connection.query(updateDb, id ,function(error, res){
            if (error) { console.log(error) }
            //console.log(amount);
            viewProducts();
        });
        
    });
}; // end of restockProducts

function addProduct() {
    inquirer.prompt([
        {
            name: "Name",
            type: "input",
            message: "What is the name of the product you wish to add?"
        },
        {
            name: "Department",
            type: "input",
            message: "What is the department for this product?"
        },
        {
            name: "Price",
            type: "input",
            message: "State the price of this product."
        },
        {
            name: "Quantity",
            type: "input",
            message: "What is the quantity of the new Product?"
        },
    ]).then(function (answers) {
        var name = answers.Name; 
        var department = answers.Department
        var price = answers.Price;
        var quantity = answers.Quantity;
        publishNewItem(name, department, price, quantity);
    });
}; //end of this function

// create insert into database

function publishNewItem(name, department, price, quantity) {
    connection.query('INSERT INTO Products (product_name,department_name,price,stock_quantity) VALUES("' + name + '","' + department+ '",' + price + ', ' + quantity + ')');
    console.log("product_name: ", name);
    console.log("department_name: ", department);
    console.log("price: ", price);
    console.log("stock_quantity:", quantity);
    viewProducts();
}
