dindinw.io
==========

The personal blog site hosted by github page.

迭代1
-----

## feature

 - Support blog function.
    - 使用Md撰写
    - syntax highlight
    - work with img and link (even embedded video link)

 - Generated static site by script.
    - use node.js JavaScript 

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