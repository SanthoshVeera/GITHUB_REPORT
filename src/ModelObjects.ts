export interface User {
    login: string,
    id: number,
    url: string,
    noOfRepos: number,
    repos?: Repo[]
}

export interface Repo {
    repoId: string,
    repoURL: string,
    owner: string
    noOfForks: number
}