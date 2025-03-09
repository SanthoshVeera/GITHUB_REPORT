import * as request from 'request';
import { Repo, User } from './ModelObjects';

export class GithubAPIService {
    options = {
        headers: {
            'User-Agent': 'request'
        }
    }

    getUserData(userName: string, cb: (respBody: any) => void) {
        request.get('https://api.github.com/users/' + userName, this.options, (error: any, resp: any, respBody: any) => {
            respBody = JSON.parse(respBody);
            const user: User = {
                login: respBody.login,
                id: respBody.id,
                url: respBody.html_url,
                noOfRepos: respBody.public_repos,
            }
            cb(user)
        })
    }

    getAllRepos(userName: string, cb: (repos: Repo[]) => void) {
        request.get('https://api.github.com/users/' + userName + '/repos' , this.options, 
            (error: any, resp: any, respBody: any) => {
                respBody = JSON.parse(respBody);
                const repos: Repo[] = respBody.map((response: any) => (
                    {
                        repoId: response.id,
                        repoURL: response.url,
                        owner: response.owner.login,
                        noOfForks: response.forks
                })
            );
            cb(repos);
        })
    }
}