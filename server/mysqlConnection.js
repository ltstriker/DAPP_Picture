var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'blog'
});

connection.connect();

var sql = 'create table if not exists user('
                  +'name  char(20) not null unique,'
                  +'pwd   char(20) not null,'
                  +'uid    char(10) not null unique,'
                  +'email char(20) unique,'
                  +'phone char(12) unique,'
                  +'primary key(uid))ENGINE = InnoDB;';
connection.query(sql, function (error, results, fields) {
  if (error) throw error;
  console.log('get table user: successed!');
});

sql = 'create table if not exists blog('
                  +'uid         char(20) not null,'
                  +'bid         char(50) not null,'
                  +'title       char(20) not null,'
                  +'content     text,'
                  +'hide        boolean default false,'
                  +'lastedit    char(20),'
                  +'primary key(bid),'
                  +'foreign key(uid) references user(uid)'
                  +'on delete cascade)ENGINE = InnoDB;';
connection.query(sql, function (error, results, fields) {
  if (error) throw error;
  console.log('get table blog: successed!');
});

sql = 'create table if not exists comment('
                  +'uid         char(20) not null,'
                  +'bid         char(50) not null,'
                  +'cid         char(50) not null,'
                  +'content     text,'
                  +'hide        boolean default false,'
                  +'lastedit    char(20),'
                  +'primary key(cid),'
                  +'foreign key(uid) references user(uid) on delete cascade,'
                  +'foreign key(bid) references blog(bid)'
                  +'on delete cascade)ENGINE = InnoDB;';
connection.query(sql, function (error, results, fields) {
  if (error) throw error;
  console.log('get table blog: successed!');
});

module.exports = connection;
