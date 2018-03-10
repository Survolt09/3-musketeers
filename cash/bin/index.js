#!/usr/bin/env node

const Conf = require('conf');
const helpers = require('./helpers.js');
const cash = require('./cash.js');

const config = new Conf();

/**
*@param  {array} argv - retrieve the command line arguments to construct the command given to cash module
*slice(2) return everything that was typed in the command line.
*If it was slice(0) , argv[0] would be the path to nodeJS and argv[1] would be the path to the script
*/

const argv = process.argv.slice(2);

helpers(argv);

/**
*@param {Object} command - construct the command object to pass to cash from the argv array
*@property {number} amount - the amount to Convert
*@property {string} from - the currency to convert from
*@property {string} to - the currency to convert to
*/

const command = {
  'amount': argv[0] || 1,
  'from': argv[1] || config.get('defaultFrom', 'USD'),
  'to':
    argv.length > 2
      ? process.argv.slice(4)
      : config.get('defaultTo', ['USD', 'EUR', 'GBP'])
};

/** call the cash module with the command as argument */

cash(command);
