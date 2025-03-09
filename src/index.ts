import { GithubAPIService } from "./GithubAPIService";
import * as _ from "lodash";
import { Repo } from "./ModelObjects";


console.log('Hello World');

console.log('Its working');

const githubAPIService = new GithubAPIService();

if (process.argv.length < 3) {
    console.log('Please enter a valid Github username');
} else {
    console.log('Github User: '  + process.argv[2]);
    githubAPIService.getUserData(process.argv[2], (user) => {
        githubAPIService.getAllRepos(process.argv[2], (repos) => {
            let sortedRepos: Repo[] = _.sortBy(repos, [(repo) => repo.noOfForks * -1]);
            let filteredRepos: Repo[] = _.take(sortedRepos, 3);
            user.repos = filteredRepos;
            console.log(user);
        });

    });
}
