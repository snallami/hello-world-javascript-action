const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/action");

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
  console.log(`Hello  ${nameToGreet}!, Good morning`);
  
  //Get octokit reference
  const octokit = new Octokit();
  
  (async () => {

const { response } = await octokit.request('GET /orgs/{org}/teams/{nameToGreet}/members', {
  org: 'myownorgtest',
  team_slug: nameToGreet
});
    
    console.log(`********************************`)
console.log(response)
console.log(`********************************`)
    
    })();



  
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
