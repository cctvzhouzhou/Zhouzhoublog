### How to use Github Pages create personal site 

create 'gh-pages' branch

```
git checkout --orphan gh-pages
```

create a index.html file, github will try to find the file to load the web content
```
echo "foo" > index.html
```

use '-u' option to push the branch to remote 

```
git push -u origin gh-pages
```

NOTE: the github site also support using 'master' branch or the 'doc' folder (in the 'master' branch).
go to your_repo 'Settings'->'GitHub Pages' section

### How to use jekyll

```
 $ gem install jekyll bundler
 ~ $ jekyll new my-awesome-site
 ~ $ cd my-awesome-site
 ~/my-awesome-site $ bundle exec jekyll serve
# => Now browse to http://localhost:4000
```


