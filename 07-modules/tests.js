const childProcess = require("child_process");
const util = require("util");
const assert = require("assert");
const execAsync = util.promisify(childProcess.exec);

(async () => {
  /**
   * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
   * 
   * Module:
   */

  // assert.strictEqual(
  //     require("./lab-7.1")(1, 2),
  //     3
  // );

  const moduleOutput = await execAsync(
    `node --print "require('./lab-7.1')(1, 2)"`
  );

  console.log("moduleOutput", moduleOutput);

  assert.strictEqual(moduleOutput.stdout.trim(), "3");

  /**
   * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
   * 
   * Program:
   */

  const programOutput = await execAsync(`node ./lab-7.1`);

  console.log("programOutput", programOutput);

  assert.strictEqual(programOutput.stdout.trim(), "42");
})();
