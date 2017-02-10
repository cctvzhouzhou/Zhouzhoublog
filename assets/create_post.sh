NAME=$1

: ${NAME:="my_post"}
: ${CAT:="blockchain mathematics algorithm"}
: ${TAG:="blockchain algorithm kubernetes openshift openstack docker golang"}
: ${POST_DIR:="../_posts"}
: ${WORK_DIR:="../_unpublished"}

file_name="`date "+%Y-%m-%d"`-${NAME}.markdown"

if [ ! -f ${WORK_DIR}/${file_name} ]; then
  echo "create new post [${NAME}]: ${WORK_DIR}/${file_name}"
cat <<- EOF > ${WORK_DIR}/${file_name} 
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
  echo "post: ${WORK_DIR}/${file_name} exists!"
fi

echo  "link: ${POST_DIR}/${file_name} => ${WORK_DIR}/${file_name}"
ln -s ${WORK_DIR}/${file_name} ${POST_DIR}/${file_name}

echo "${file_name}" >> ${POST_DIR}/.gitignore 
