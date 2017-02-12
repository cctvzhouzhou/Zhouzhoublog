NAME=$1
: ${DRAFT_DIR:="../_drafts"}

if [[ -z $NAME ]];then
  echo "post name must provide."
  exit 1
fi
file_name="${NAME}.markdown"

if [ ! -f ${DRAFT_DIR}/${file_name} ]; then
  echo "the post [${NAME}] not found from  ${DRAFT_DIR}/${file_name}"
else
  if [[ ! "$2" == "-f" ]];then
    echo "post: ${DRAFT_DIR}/${file_name} exists!"
    echo -n  "are you sure to delete ${DRAFT_DIR}/${file_name}: [y/n]"
    read confrim 
    if [[ ! "$confrim" == "y" ]]; then exit 1; fi;
  fi
  rm ${DRAFT_DIR}/${file_name}
fi

