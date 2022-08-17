import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    {props.repos.map(repo => {
      return (
        <div id="repo-list">
        {repo.username}
        <a href={repo.repoURL}>{repo.repoName}</a>
        {repo.stars}
        </div>
      )
    })}

    There are {props.repos.length} repos.
  </div>
)

//There are {props.repos.length} repos.
export default RepoList;