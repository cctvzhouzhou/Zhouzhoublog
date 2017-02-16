NAME=$1
dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

: ${NAME:="my_post"}
: ${CAT:="blockchain mathematics algorithm"}
: ${TAG:="blockchain algorithm kubernetes openshift openstack docker golang"}
: ${POST_DIR:="${dir}/../_posts"}
: ${DRAFT_DIR:="${dir}/../_drafts"}

# Notice : 
#   we might not need to add date prefix for _draft post, the jekyll will try
#   to compelete it automatically
# Reference:
#   https://jekyllrb.com/docs/drafts/
#file_name="`date "+%Y-%m-%d"`-${NAME}.markdown"
file_name="${NAME}.markdown"

if [ ! -f ${DRAFT_DIR}/${file_name} ]; then
  echo "create new post [${NAME}]: ${DRAFT_DIR}/${file_name}"
cat <<- EOF > ${DRAFT_DIR}/${file_name} 
---

layout: post
title: ${NAME}
date: `date +%Y-%m-%d` 
comments: true
external-url:
categories: ${CAT} 
tag: ${TAG}

---
> ${NAME} 

## ${NAME}

EOF
  echo "done!"
else
  echo "post: ${DRAFT_DIR}/${file_name} exists!"
fi

