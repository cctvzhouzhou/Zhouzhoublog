---

layout: post
title: sphinx_on_github
date: 2017-02-12 
comments: true
external-url:
categories: format 

---
> 假舆马者，非利足也，而致千里；假舟楫者，非能水也，而绝江河。君子生非异也，善假於物也。（《荀子·劝学》） 

### install Sphinx

```
pip install -U Sphinx
```

### create structure 

```
cd ${workspace}                            # the folder which contains source
mkdir sphinx-build                         # the folder save sphinx build file
git clone --no-checkout ${url} sphinx-doc  # the repo wich we what to push gh-pages branch
cd sphinx-doc
git branch gh-pages                        # create the `gh-pages` branch 

git symbolic-ref HEAD refs/heads/gh-pages  # auto-switches branches to gh-pages
git clean -fdx                             # clean up, now we have a empty gh-pages branch                

```
### Work with 

```
cd sphinx-build
sphinx-quickstart

```

### How to choice

reStructuredText and Sphinx vs. kramdown Markdown and Jekyll 

readthedoc vs. github-pages

* http://idratherbewriting.com/2016/10/28/markdown-or-restructuredtext-or-dita-choosing-format-tech-docs/
* https://swcarpentry.github.io/lesson-example/02-tooling/

* http://ericholscher.com/blog/2016/mar/15/dont-use-markdown-for-technical-docs/

### Reference:

* https://github.com/daler/sphinxdoc-test.git
* https://daler.github.io/sphinxdoc-test/includeme.html
* https://github.com/daler/bioconda-docs.git
* https://daler.github.io/bioconda-docs
* http://lucasbardella.com/blog/2010/02/hosting-your-sphinx-docs-in-github


### Readthedoc 

```
cd doc
make html
```

result

```
  File "conf.py", line 6, in <module>
    from recommonmark.parser import CommonMarkParser
ImportError: No module named recommonmark.parser

```

```
pip install recommonmark

```

```
  File "conf.py", line 11, in <module>
    from django.conf import settings
ImportError: No module named django.conf
```
```
pip install django
```
```
    import djcelery
ImportError: No module named djcelery
```
```
pip install django-celery
```

```
pip install django==1.8.16
pip install django-celery==3.1.16`
```

a private hosted docker images to reference

* https://github.com/vassilvk/readthedocs-docker

[Read the Docs Sphinx Theme](https://github.com/snide/sphinx_rtd_theme)

## Note for acsii doc

[AsciiDoc Writer’s Guide](http://asciidoctor.org/docs/asciidoc-writers-guide/)

[What is AsciiBinder?](http://www.asciibinder.org/index.html)

AsciiBinder is an AsciiDoc-based system for authoring and publishing closely related documentation sets from a single source.

[AsciiBinder on Github](https://github.com/redhataccess/ascii_binder)

### Openshift Doc

The AsciiBinder system was initially developed for [OpenShift documentation](https://github.com/openshift/openshift-docs)

### And also for Pro Git 

Pro Git:(https://git-scm.com/book/en/v2)

CN : https://github.com/progit/progit2-zh
EN : https://github.com/progit/progit2


