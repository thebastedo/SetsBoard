/* 
   bandsetlist.sql - version 0.0.3 - 11/9/2014 
   Schema file used to build the tables in the database
	0.0.1 - Initial creation
	0.0.2 - Added id(smallint(6) to setlist and songs tables) 
		and setlistid smallint(6) songid smallint(6)
	0.0.3 - Changed duration from time to int (number of seconds)
	0.0.4 - added integer primary keys to id on tables, added songorder as a integer
*/

begin;
create table band (id integer primary key, name varchar(255), setlistid integer);
create table setlist(id integer primary key, name varchar(255), songid integer, songorder integer);
create table songs(id integer primary key, name varchar(255), duration int, status char(1));
commit;
