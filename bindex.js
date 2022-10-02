import * as fsp from 'fs/promises';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const fakeDatabase = {};

export default async function main() {

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
  });

  rl.prompt();
  
  rl.on('line', (line) => {
    const parseLine = line.trim().split(" "); // <-- validate func? 
    const command = parseLine[0];
    const key = parseLine[1];
    const value = parseLine[2];
    const extra = parseLine[3]; // <-- invalid syntax, too many args

    console.log('parseLine?', parseLine);
    console.log("command: ", command, "\nkey: ", key, " \nvalue: ", value)

    switch (command.trim()) {
      case 'put':
        console.log('you used the put command');
        addKeyValue(key, value, extra)
        break;
      case 'fetch':
        console.log('you used the fetch command');
        console.log('fakeDataBase', Object.keys(fakeDatabase));
        break;
      case 'exit':
        console.log('Bye!')
        process.exit(0);
      default:
        console.log(`Say what? I might have heard '${line.trim()}'`);
        break;
    }

    rl.prompt();

  }).on('close', () => {
    console.log('Bye!');
    process.exit(0);
  });

}

function addKeyValue(key, value, extra) {
  console.log("extra!", extra)
  if (!key || !value || extra) {
    console.log("Invalid syntax");
    main();
  } else {
    fakeDatabase[key] = value;
    console.log("did it work? fakeData: ", fakeDatabase)

  }
}