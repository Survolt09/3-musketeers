/*eslint-disable no-process-exit*/
const got = require('got');
const money = require('money');
const chalk = require('chalk');
const ora = require('ora');
const currencies = require('../lib/currencies.json');

/**
*@param {string} API - the URL to get a JSON object containing the actual exchange rate of euro.
*/

const API = 'https://api.fixer.io/latest';

/**
*@function convert - The function to convert currency
*@param configuration - A json document containing the amount
*/

const convert = configuration => {
  const {amount, to, from, response, loading} = configuration;

  money.base = response.body.base;
  money.rates = response.body.rates;

/**
*Check foreach currency entered by the user if they exist in the JSON currencies object
*/
  to.forEach(item => {
    if (currencies[item]) {
      loading.succeed(
        `${chalk.green(
          money.convert(amount, {from, 'to': item}).toFixed(2)
        )} ${`(${item})`} ${currencies[item]}`
      );
    } else {
      loading.warn(`${chalk.yellow(` The ${item} currency not found `)}`);
    }
  });

  console.log();
  console.log(
    chalk.underline.gray(
      ` Conversion of ${chalk.bold(from)} ${chalk.bold(amount)}`
    )
  );
  process.exit(1);
};

/**
*@async
*@function cash
*@param {Object} command - the object representing the command created from the user's inputs
*/
const cash = async command => {
  const amount = command.amount;
  const from = command.from.toUpperCase();

  /**
  *@param {array} to - the currency to convert to
  * make sure the item are not already contained in the from object.
  */
  const to = command.to
    .filter(item => item !== from)
    .map(item => item.toUpperCase());

  console.log();

  /**
  *@param {Object} loading - create an elegant terminal spinner with some optional arguments
  */

  const loading = ora({
    'text': 'Converting currency...',
    'color': 'green',
    'spinner': {
      'interval': 200,
      'frames': to
    }
  });

  loading.start();

/**
*start converting and catch potential error
*/
  try {
    const response = await got(API, {'json': true});

    convert({amount, to, from, response, loading});
  } catch (err) {
    if (err.code === 'ENOTFOUND') {
      loading.fail(chalk.red('   Please check your internet connection.\n'));
    } else {
      loading.fail(chalk.red('   Internal server error... \n'));
    }

    process.exit(1);
  }
};

module.exports = cash;
