#! /bin/sh
export DB2UTIL_JSON_CONTAINER=array
/QOpenSys/pkgs/bin/db2util -o json -p $1 "SELECT * FROM QIWS.QCUSTCDT LIMIT ?" > $2
