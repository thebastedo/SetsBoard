#!/bin/sh

# installdb.sh - Install sqlite3 from apt-get and create the database
# version 0.0.1 - 11/6/2014

#Install sqlite from apt-get
sudo apt-get install sqlite3

# Run sqlite3 and create the database with input from the .sql file
sqlite3 bandsetlist.db < bandsetlist.sql
