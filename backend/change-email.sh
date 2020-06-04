#!/bin/sh

git filter-branch --env-filter '

OLD_EMAIL="caio.farias@di2win.com"
CORRECT_NAME="Caio Farias"
CORRECT_EMAIL="caiohenriquefarias16@gmail.com"

if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags

# after that run git push --force --tags origin 'refs/heads/*'