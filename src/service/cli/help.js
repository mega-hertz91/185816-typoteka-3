'use strict';

const allCommands = [
  {
    name: `--help`,
    description: `watch all commands`,
    arg: false
  },
  {
    name: `--version`,
    description: `return current version`,
    arg: false
  },
  {
    name: `--generate`,
    description: `generate mok data to path('/src/moks.json')`,
    arg: `<count>`
  }
]

module.exports = {
  name: `--help`,
  run() {
    console.log(`Guide:`);
    console.log(`  service.js:   command`);
    console.log(`Commands:`);
    allCommands.forEach((command) => {
      command.arg = command.arg ? command.arg : `     `;
      console.log(`  ${command.name}: ${command.arg} ${command.description}`)
    })
  }
}
