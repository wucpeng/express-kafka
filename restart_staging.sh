#!/bin/bash

set +e

kill -9 `pgrep modaldev` > /dev/null 2>&1
> modaldev.log
sleep 1
NODE_ENV=staging nohup node server.js > modaldev.log 2>&1 &

while true;
do
        ps -ax 2> /dev/null | grep modaldev | grep worker 1> ps.log
        if [ -n "`cat ps.log`" ]; then
                break
        else
                sleep 1
        fi
done
