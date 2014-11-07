/* 
   bandsetlist.sql - version 0.0.1 - 11/6/2014 
   Schema file used to build the tables in the database
*/

begin;
create table band (id smallint(6) primary key, name varchar(255));
create table setlist(name varchar(255));
create table songs(name varchar(255), duration time, status char(1));
commit;
