const core = require("@actions/core");
const exec = require("@actions/exec");
const io = require("@actions/io");

// most @actions toolkit packages have async methods
async function run() {
  try {
    let docsetutilPath = await io.which("docsetutil", true);
    core.debug(`docsetutil found at ${docsetutilPath}`);
  } catch (error) {
    core.debug(`docsetutil not found; installing with Homebrew`);
    await exec.exec("brew install swiftdocorg/formulae/docsetutil");
  }

  try {
    const docsetPath = core.getInput("path");
    core.debug(`Validating docset at ${docsetPath}`);
    await exec.exec("docsetutil validate", [docsetPath]);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
