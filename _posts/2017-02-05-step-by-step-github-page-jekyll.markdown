---
layout: post
title:  "Step by step blogging guide by using GitHub Pages and Jekyll"
date:   2017-02-05 14:00
categories: jekyll 
uthor:
  name: Alex Wu 
  url: http://twitter.com/yidingwu
  mail: wuyiding at gmail.com
  avatar: https://avatars3.githubusercontent.com/u/1134993?v=3&u=8b7b3ffbf13c7228c6a5b85ef9faf065ff8a8db6&s=60
design:
  image: https://jekyllrb.com/img/logo-2x.png
  bg_color: "#00715A"
tags:
- jekyll 
related:
- welcome-to-jekyll
---
Step by step guide to use GitHub Pages and Jekyll to create personal blog.

## How to use Github Pages create personal site 

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

1. Install and run jekyll 

```
 $ gem install jekyll bundler
 ~ $ jekyll new my-awesome-site
 ~ $ cd my-awesome-site
 ~/my-awesome-site $ bundle exec jekyll serve
# => Now browse to http://localhost:4000
```

2. Create an new post 

You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.

To add new posts, simply add a file in the `_posts` directory that follows the convention `YYYY-MM-DD-name-of-post.ext` and includes the necessary front matter. Take a look at the source for this post to get an idea about how it works.

Jekyll also offers powerful support for code snippets:

{% highlight ruby %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

3. Change default Theme

by default, jekyll use the `minima` theme
```
$ bundle show |grep minima
  * minima (2.1.0)
```


Check out the [Jekyll docs][jekyll-docs] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll Talk][jekyll-talk].

[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
