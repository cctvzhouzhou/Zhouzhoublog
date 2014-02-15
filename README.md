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

Tasks
-----

### Create Site structure

```bash
for d in blog doc js css ; do p=site/$d ; mkdir -p $p ; touch $p/.gitignore ; done
```
### Sublime text set up

#### Package installer 

#### Md highlight

#### Md preview

`Ctrl-P` (Windows/Linux) or `CMD-P` (Mac) -> enter `prewb`

#### Console 

``Ctrl-` `` will open a python console (with embeded inside sublime).


#### Terminal

Sometimes, you may want a os terminal inside your working folder, here a plugin called [sublime_terminal][s_t] is.

- Install : `Ctrl-P` -> `pkgcip` -> `terminal`
- Usage : 
    - `Ctrl-T` open under your file
    - `Ctrl-Alt-T` open under your project 

[s_t]: https://github.com/wbond/sublime_terminal


#### SublimeREPL
repl:shell can open a os shell  

[repl]: https://github.com/wuub/SublimeREPL/

#### Build JavaScript code

Go to "Tools > Build System > New Build System" , add code like:

```
{
	"cmd": ["node","$file"],
	"selector": "source.js"
}
```

After that, we can use `ctrl-B` to build javascript.

#### Test Javascript Code

##### NodeUnit
install : `npm i nodeunit -g`

[nodeunit]:https://github.com/caolan/nodeunit


