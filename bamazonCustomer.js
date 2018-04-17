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

// test connection
// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     connection.end();
//   });

function displayProducts() {
    connection.query('SELECT * FROM Products', function (error, response) {
        if (error) { console.log(error) }
        var table = new Table({
            head: ['Item ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity'],
            colWidths: [10, 30, 18, 10, 18]
        });
        for (i = 0; i < response.length; i++) {
            table.push(
                [response[i].item_id, response[i].product_name, response[i].department_name, response[i].price, response[i].stock_quantity]
            );
        }
        console.log(table.toString());
        canIHelpYou();
    });
}; //End of displayProducts

// create function for : 
// 1. The first should ask them the ID of the product they would like to buy.
// 2. The second message should ask how many units of the product they would like to buy.


function canIHelpYou() {
    inquirer.prompt([
        {
            name: 'ID',
            type: 'input',
            message: "Provide the item number that you would like to buy."
        }, {
            name: 'Quantity',
            type: 'input',
            message: 'How many do you need?'
        },

    ]).then(function (answers) {
        // Use user feedback for... whatever!!
        var amtToBuy = answers.Quantity;
        var IDToBuy = answers.ID;
        warehouse(IDToBuy, amtToBuy);
    });
};

function warehouse(itemNo, amtToSell) {
    //console.log("Selecting all products...\n");
    //console.log(itemNo)
    //var queryStr = 'SELECT * FROM Products WHERE ?';
    // select * from products where item_id =${itemNo}
    connection.query(`SELECT * FROM Products WHERE item_id = ${itemNo}`, function (error, res) {
        if (error) { console.log(error) }
        
        //   console.log(amtToSell)
        //console.log("Connected!");
        //console.log(res);
        
        if (amtToSell  <= res[0].stock_quantity){
            var totalCost = res[0].price * amtToSell;
            //console.log(res[0].amtToSell);

            console.log("Your order is ready for checkout.");
            console.log("The total cost for " + amtToSell + " " + res[0].product_name + " is $" + totalCost + '.');

            connection.query('UPDATE Products SET stock_quantity = stock_quantity - ' + amtToSell + ' WHERE item_id = ' + itemNo);
        } else {
            console.log("There is insufficient " + res[0].product_name + " for your purchase. Sorry we are unable to fulfil your order.");
        };
        displayProducts();
    });
};
displayProducts();