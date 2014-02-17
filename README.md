dindinw.io
==========

The personal blog site hosted by github page.

迭代1
-----

## feature

 - Support blog function.
    - 使用Md撰写
    - syntax highligh
    - work with img and link (even embeded video link)

 - Generated static site by script.
    - use node.js javacript 

 - Design site 

```
dindinw.io
└─site
    ├─blog
    ├─css
    ├─doc
    └─js
```

```
dindinw.io/
`-- site
    |-- blog
    |-- css
    |-- doc
    `-- js
```
## Tasks

### Task1 Create Site structure

```bash
for d in blog doc js css ; do p=site/$d ; mkdir -p $p ; touch $p/.gitignore ; done
```
### Task2

### Setup Sublime Text 

#### Active Vim mode

1. for sublime 2, vintage[v1] is good enough.

presss command-P Prefersu, add fellowing settings

```
{
    //enable "Vintage"
    "ignored_packages": []
}
```
2. for sublime 3 , use vintagous[v2] instead.
Download from here[v2_d], copy into "/Users/{your_name}/Library/Application Support/Sublime Text 3/Installed Packages/" folder
BTW, although the office doc says vintagous need to ensure Vintage is in the ignored_packages, wried the two can work together in my test.

3. In Mac, need to disable repeat key context menu, see here[key_repeat] for more details

```
defaults write com.sublimetext.3 ApplePressAndHoldEnabled -bool false
```

[v1][http://www.sublimetext.com/docs/2/vintage.html]
[v2][https://github.com/guillermooo/Vintageous]
[v2_d][https://bitbucket.org/guillermooo/vintageous/downloads/Vintageous.sublime-package]
[key_repeat][https://gist.github.com/kconragan/2510186]

#### Install Package Installer

#### Install Md extend syntax highlight

#### Install Md proview 


