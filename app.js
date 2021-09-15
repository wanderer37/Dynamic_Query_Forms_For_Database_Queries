var eloRatings = [1200, 1000, 1000, 1400, 800,
  800, 1200, 800, 800, 1000
];
//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
//const mysql = require("mysql");


const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
//for using static images, css files
app.use(express.static("public"));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
  //console.log("SUCCESS HERE;")
});


app.post("/", function(req, res) {
  const query = req.body.query;
  //console.log(query);

  let stringQuery = query;
  let wordsQuery = stringQuery.split(' ');

  for (let step = 0; step < wordsQuery.length; step++) {
    console.log("Query Number: ", step, wordsQuery[step]);
  }

  function querybuilder(num, wordsQuery = []) {

    var queryValues = {
      query1: "SELECT customerNumber, customerName, country, creditLimit FROM customers",
      query2: "SELECT * FROM employees",
      query3: "SELECT * FROM offices",
      query4: "SELECT * FROM orderdetails ORDER BY priceEach DESC LIMIT 5",
      query5: "SELECT * FROM orders WHERE DATE_SUB(shippedDate, INTERVAL 1 DAY) = orderDate LIMIT 5",
      query6: "SELECT * FROM payments ORDER BY amount ASC LIMIT 5",
      query7: "SELECT * FROM products",
      query8: "SELECT * FROM productlines",
      query9: "SELECT productName, productLine, buyPrice FROM products WHERE productLine = 'Classic Cars' ORDER BY buyPrice ASC LIMIT 10",
      query10: "SELECT buyPrice FROM products ORDER BY buyPrice ASC LIMIT 10"
    };

    reqQuery = "query" + num;
    return queryValues[reqQuery];
  }

  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host: 'localhost',
    port: 3200,
    user: 'root',
    password: '',
    database: 'projectdb'
  });
  try {
    connection.connect();
    console.log("Connected!!")
  } catch (error) {
    console.log(error)
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////
  function encode(phrase) {
    const phraseTokens = phrase.split(' ')
    const encodedPhrase = dictionary.map(word => phraseTokens.includes(word) ? 1 : 0)

    return encodedPhrase
  }

  const dictionary = ['customers', 'employees', 'offices', 'order details', 'price',
    'payments', 'products', 'productlines', 'productnames', 'buyPrice'
  ];


  //console.log(encode('Information about customers'));
  let queryNumberGenerated = encode(req.body.query);
  console.log("\nqueryNumberGenerated", queryNumberGenerated, typeof(queryNumberGenerated));

  var queryNumberGeneratedArray = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  for (i = 0; i < queryNumberGenerated.length; i++) {
    queryNumberGeneratedArray[i] = queryNumberGenerated[i];
  }
  console.log("\nqueryNumberGeneratedArray", queryNumberGeneratedArray, typeof(queryNumberGeneratedArray));


  const brain = require('brain.js');

  const config = {
    binaryThresh: 0.5,
    hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
    activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
    leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
  };

  // create a simple feed forward neural network with backpropagation
  const net = new brain.NeuralNetwork(config);

  net.train([{
      input: [
        1, 0, 0, 0, 0,
        0, 0, 0, 0, 0
      ],
      output: ["1"]
    },
    {
      input: [
        0, 1, 0, 0, 0,
        0, 0, 0, 0, 0
      ],
      output: ["2"]
    }, {
      input: [
        0, 0, 1, 0, 0,
        0, 0, 0, 0, 0
      ],
      output: ["3"]
    }, {
      input: [
        0, 1, 0, 0, 0,
        0, 0, 0, 0, 0
      ],
      output: ["2"]
    }, {
      input: [
        0, 1, 0, 0, 0,
        0, 0, 0, 0, 0
      ],
      output: ["2"]
    }, {
      input: [
        0, 1, 0, 0, 0,
        0, 0, 0, 0, 0
      ],
      output: ["2"]
    }, {
      input: [
        0, 1, 0, 0, 0,
        0, 0, 0, 0, 0
      ],
      output: ["2"]
    }, {
      input: [
        0, 1, 0, 0, 0,
        0, 0, 0, 0, 0
      ],
      output: ["2"]
    }, {
      input: [
        0, 1, 0, 0, 0,
        0, 0, 0, 0, 0
      ],
      output: ["2"]
    }, {
      input: [
        0, 1, 0, 0, 0,
        0, 0, 0, 0, 0
      ],
      output: ["2"]
    },
  ]);

  let output = net.run(queryNumberGenerated);
  //console.log("\nOutput", output, "\n", output[0]);

  let querybuilderNumber = Math.floor(output[0]);
  //console.log("\nquerbuilderNumber", querybuilderNumber);

  querybuilderNumber = querybuilderNumber + 1;
  querybuilderNumber = querybuilderNumber.toString();
  //console.log("\nThe final output we are sending\n", querybuilderNumber);

  function compareListedVals(List1, List2) {
    let elem = 0
    for (j = 0; j < List1.length; j++) {
      if (List1[j] != List2[j]) {
        elem = 1
      };
    }

    if (elem == 1) {
      return false;
    } else {
      return true;
    }
  }

  function assignFinalValues(inputEncode) {

    var outputEncode = 0;
    console.log("\ninputEncode", inputEncode);

    if (compareListedVals(inputEncode, [1, 0, 0, 0, 0, 0, 0, 0, 0, 0])) {
      outputEncode = 1;
    } else if (compareListedVals(inputEncode, [0, 1, 0, 0, 0, 0, 0, 0, 0, 0])) {
      outputEncode = 2;
    } else if (compareListedVals(inputEncode, [0, 0, 1, 0, 0, 0, 0, 0, 0, 0])) {
      outputEncode = 3;
    } else if (compareListedVals(inputEncode, [0, 0, 0, 1, 0, 0, 0, 0, 0, 0])) {
      outputEncode = 4;
    } else if (compareListedVals(inputEncode, [0, 0, 0, 0, 1, 0, 0, 0, 0, 0])) {
      outputEncode = 5;
    } else if (compareListedVals(inputEncode, [0, 0, 0, 0, 0, 1, 0, 0, 0, 0])) {
      outputEncode = 6;
    } else if (compareListedVals(inputEncode, [0, 0, 0, 0, 0, 0, 1, 0, 0, 0])) {
      outputEncode = 7;
    } else if (compareListedVals(inputEncode, [0, 0, 0, 0, 0, 0, 0, 1, 0, 0])) {
      outputEncode = 8;
    } else if (compareListedVals(inputEncode, [0, 0, 0, 0, 0, 0, 0, 0, 1, 0])) {
      outputEncode = 9;
    } else if (compareListedVals(inputEncode, [0, 0, 0, 0, 0, 0, 0, 0, 0, 1])) {
      outputEncode = 10;
    } //else if (compareListedVals(inputEncode, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]))


    return outputEncode;
  }

  var querybuilderNumberVal = 0;
  //console.log("\nqueryNumberGenerated", queryNumberGenerated);
  querybuilderNumberVal = assignFinalValues(queryNumberGeneratedArray);
  console.log("\nquerybuilderNumberVal", querybuilderNumberVal);
  //////////////////////////////////////////////////////////////////////////////////////////////////

  //funcion for updating Elo Ratings of Keywords
  function updateEloRatings(query) {
    updateQuery = req.body.query;
    var EloRating = require('elo-rating');
    EloRating.NextRatingFn(dictionary[queryNumberGenerated]);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////

  //In case of conflict arising we decide what are the cases which are conflicting
  function decode(encodedPhrase) {
    const decodedPhrase = dictionary.map(num => num.value.includes(num) ? encodedPhrase : decode);
    const phraseWord = decodedPhrase.join();

    return phraseWord;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////

  //finding out what all queries are intersected, what tables are performing the unexpected results
  function conflictQuery(queryNumberGeneratedArray) {

    var dictionaryConflicting;
    var zero = newFilledArray(maxLength, 0);
    dictionaryConflicting = zero.slice(0, requiredLength);

    let presenceDetected = 0;

    for (i = 0; i < queryNumberGeneratedArray.length(); i++) {
      if (queryNumberGeneratedArray[i] === 1) {
        presenceDetected = presenceDetected + 1;
      }
    }

    if (presenceDetected > 1) {
      intersectingQueryKeywords = decode(queryNumberGeneratedArray[presenceDetected]);
    }
    return intersectingQueryKeywords;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////

  function compareEloRating(listQueryIntersecion) {
    var EloRating = require('elo-rating');

    var playerWin = false;
    var result = EloRating.calculate(listQueryIntersecion[decode()], listQueryIntersecion[decode()], queryWin);

    console.log(result.queryRating)
    console.log(result.intersectingQueryRating)

    result = EloRating.calculate(queryRating, intersectingQueryRating);

    console.log(result.queryRating)
    console.log(result.intersectingQueryRating)
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  //for multiple query conflict we will do resolution by having them compared their Elo Ratings
  function conflictResolution(intersectingQueryKeywords) {
    if (EloRating.NextRatingFn(intersectingQueryKeywords[0]) >= EloRating.NextRatingFn(intersectingQueryKeywords[1])) {
      preferedQuery = intersectingQueryKeywords[0];
    } else {
      preferedQuery = intersectingQueryKeywords[1];
    }

    if (querybuilder(querybuilderNumberVal.toString() != preferedQuery)) {
      querybuilderNumberVal.toString() = preferedQuery;
    } else {
      querybuilderNumberVal.toString() = dictionary[querybuilderNumber];
    }
    return preferedQuery
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////

  function precisionRecallCalculation(relevantStrings, retrievedStrings) {
    const defaultValues = {
      precision: 0,
      recall: 0,
      f: 0,
    };

    const calculator = (relevantStrings, retrievedStrings) => {
      if (!relevantStrings || relevantStrings.length === 0) {
        return defaultValues;
      }

      if (!retrievedStrings || retrievedStrings.length === 0) {
        return defaultValues;
      }

      const relevantSet = new Set(relevantStrings);
      const uniqueRelevant = Array.from(relevantSet);

      const retrievedSet = new Set(retrievedStrings);
      const uniqueRetrieved = Array.from(retrievedSet);

      const intersection = uniqueRelevant.filter(x => retrievedSet.has(x));

      if (!intersection || intersection.length === 0) {
        return defaultValues;
      }

      const precision = intersection.length / uniqueRetrieved.length;
      const recall = intersection.length / uniqueRelevant.length;
      const f = 2 * (precision * recall) / (precision + recall);
      return {
        precision,
        recall,
        f,
      };
    };
  } //function precisionRecallCalculation
  /////////////////////////////////////////////////////////////////////////////////////////////////
  function prf() {

    var retrievedStrings = ['yes', 'yes', 'yes'];
    var relevantStrings = ['yes', 'no', 'no'];

    intersection = ['yes', 'yes']

    const precision = intersection.length / retrievedStrings.length;
    const recall = intersection.length / retrievedStrings.length;
    const f = 2 * (precision * recall) / (precision + recall);

    console.log(precision, "\n", recall, "\n", f, "\n");
    //console.log(precisionRecallCalculation(relevantStrings, retrievedStrings), "\n")
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  function calculateAll() {
    eloRatings[querybuilderNumberVal] += (Math.max(...eloRatings) - Math.min(...eloRatings)) / eloRatings[querybuilderNumberVal];
    console.log(eloRatings)
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  calculateAll()

  prf()

  //console.log(precisionRecallCalculation(relevantStrings, retrievedStrings))

  connection.query(querybuilder(querybuilderNumberVal.toString()), function(error, results, fields) {
    if (error) console.log(error);
    resultValues = results[0];
    //console.log('The solution is: ', results);
    res.send(results);
    console.log("RESULTS");
  });

  connection.end();
});


app.listen(3000, function() {
  console.log("Server Initialised at Port Number 3000");
});
