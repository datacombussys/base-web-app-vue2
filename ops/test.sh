#!/bin/bash
SERVER_TYPE=$1
echo $SERVER_TYPE
printf "Server install type is: %s\n" "$SERVER_TYPE"

printf "SERVER_TYPE one is: %s\n" "$SERVER_TYPE"
if [ "$SERVER_TYPE" == '-staging' ]; then
	printf "\n the argument is staging \n"
	echo "install.sh SERVER_TYPE -staging is executed- Scripts section"
else
	printf "\n the argument is prod \n"
	echo "install.sh SERVER_TYPE -prod is executed- Scripts section"
fi

printf "\n File completed!\n"