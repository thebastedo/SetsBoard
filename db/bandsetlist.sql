/* 
   bandsetlist.sql - version 0.0.2 - 11/8/2014 
   Schema file used to build the tables in the database
	0.0.1 - Initial creation
	0.0.2 - Added id(smallint(6) to setlist and songs tables) 
		and setlistid smallint(6) songid smallint(6)
*/

begin;
create table band (id smallint(6), name varchar(255), setlistid smallint(6));
create table setlist(id smallint(6), name varchar(255), songid smallint(6));
create table songs(id smallint(6), name varchar(255), duration time, status char(1));
commit;
