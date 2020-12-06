const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  const orgSecret = core.getInput('org-secret');
  console.log(`Hello  ${nameToGreet}!, Good morning`);
  
  //Get octokit reference
  const octokit = github.getOctokit(orgSecret);
const response = await octokit.request('GET /orgs/{org}/teams/{nameToGreet}', {
  org: 'myownorgtest',
  team_slug: nameToGreet
})

console.log(`********************************`)
console.log(response)
console.log(`********************************`)

  
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
