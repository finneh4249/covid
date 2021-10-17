/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const { CommandInteraction, MessageEmbed } = require('discord.js')
const utils = require('../../utils')
const cheerio = require('cheerio')
const { stateOptions } = require('../../config/covid.json')

module.exports = {
  name: 'covid',
  description: 'Show covid information in various forms.',
  options: [{
    name: 'state',
    description: 'Display covid information about the specified state',
    type: 'STRING',
    required: true,
    choices: [{
      name: 'Not Valid',
      value: 'invalid'
    }, {
      name: 'Australia',
      value: '0'
    }, {
      name: 'Australian Capital Territory',
      value: '7'
    }, {
      name: 'New South Wales',
      value: '1'
    }, {
      name: 'Northern Territory',
      value: '8'
    }, {
      name: 'Queensland',
      value: '3'
    }, {
      name: 'South Australia',
      value: '5'
    }, {
      name: 'Tasmania',
      value: '6'
    }, {
      name: 'Victoria',
      value: '2'
    }, {
      name: 'Western Australia',
      value: '4'
    }]
  }],
  /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
  async execute (interaction) {
    const stateName = interaction.options.getString('state')

   if (stateOptions[stateName]) { // Redundant if statement
     
      const covidData = await utils.request('https://covidlive.com.au/covid-live.json')
      const obj = JSON.stringify(covidData[stateName]) // Is this the right syntax?
      console.log(obj) // Returns "R"
      
      /* Just pretend this bit isn't here, first I need to actually get the data I want before I make it look pretty!
      const data = await utils.getData('covid', stateName, stateOptions[stateName], 1000 * 60 * 10)

      const stateResponse = new MessageEmbed()
        .setColor('PURPLE')
        .setAuthor('Covid Information', 'https://i.imgur.com/5OJw0j7.png')
        .setTitle(`${stateOptions[stateName]} COVID Information`)
        .setThumbnail('https://i.imgur.com/5OJw0j7.png')
        .setFields(data.fields)
        .setTimestamp(data.updatedTime)
        .setFooter(data.footer)
      interaction.reply({ embeds: [stateResponse] })
    } else {
      interaction.reply({ embeds: [new MessageEmbed().setTitle('ERROR').setDescription('Support for that state is currently unavailable')] })
    } */
     
     
      interaction.reply({ embeds: [new MessageEmbed().setTitle('State Chosen').setDescription(`${stateOptions[stateName]}, ${obj.field[stateName]}`)] })
    } else {
      interaction.reply({ embeds: [new MessageEmbed().setTitle('You are stupid')] })
    }
  }
}
