"use strict";
const connection = require('./mysqlConnection');
const express = require('express');
const router = express.Router();

const UUID = require('uuid');
const bcrypt = require('bcryptjs');
const blogInPage = 5;
const salt = bcrypt.genSaltSync(13);

const admin = 'admin';//make the account at DB and then change here

router.post('/api/login/trylogin',(req,res) => {
  let paramsErr = validator.checkLogin(req.body);
  if (paramsErr.err) {
    res.send({sign: false, msg: 'the user or password is not valid'});
  } else {
    var sql = 'select count(*) as result from user where name = ? and pwd = ?';
    var param = [req.body.username, req.body.password];
    connection.query(sql,param,function (err, result) {
      if(err){
        console.log(err);
        res.send({sign: false, msg: 'something is wrong'});
      } else {
        console.log(result);
        if(result[0].result == 1)
          res.send({sign: true, msg: 'successed!'});
        else {
          res.send({sign: false, msg: 'the user or password is wrong'});
        }
      }
    });
  }
});

router.post('/api/detail/trylogout',(req,res) => {
  res.send({sign: true});
});

router.post('/api/register/tryregister',(req,res) => {
  let paramsErr = validator.checkRegister(req.body);
  if (paramsErr.err) {
    res.send({sign: false,msg: paramsErr, error: 'Something wrong happened'});
  } else {
    //insert
    var sql = 'insert into user(name, pwd, uid, email, phone) values(?,?,?,?,?)';
    var param = [req.body.username, req.body.password, req.body.id, req.body.email, req.body.phone];
    connection.query(sql,param,function (err, result) {
      if(err){
        res.send({sign: false, msg: err.sqlMessage});
      } else {
        res.send({sign: true});
      }
    });
  }
});

router.post('/api/detail/getuser', (req, res) => {
  var sql = 'select * from user where name = ?';
  var param = [req.body.username];
  connection.query(sql,param,function (err, result) {
    if(err){
      res.send({sign: false, msg: 'something is wrong'});
    } else {
      if(result.length == 1)
        res.send({sign: true, data: result[0],msg: ''});
      else {
        res.send({sign: false, msg: 'you have not logined'});
      }
    }
  });
});

router.post('/api/blog/getblog', (req, res) => {
  var d = new Date();
  let params = {
    lastedit: d.toLocaleString()
  };
  if(req.body.title!=undefined) {
    params['title'] = req.body.title;
  }
  if(req.body.content!=undefined) {
    params['content'] = req.body.content;
  }

  var sql = 'select uid from user where name = ?';
  var param = [req.body.author];
  connection.query(sql,param,function (err, result) {
    if(err){
      res.send({sign: false, msg: 'something is wrong'});
    } else {
      if(result.length == 1) {
        params['uid'] = result[0].uid;
        sql = 'select * from blog where bid = ?';
        param = [params['uid']];
        connection.query(sql,param,function (err, result) {
          if(err){
            res.send({sign: false, msg: 'something is wrong'});
          } else {
            if(result.length == 1) {
              var article = result[0];
              res.send({sign: true,
                data: {
                  title: article['title'],
                  content: article['content'],
                  lastedit: article['lastedit']
                }});
            } else {
              res.send({sign: false, msg: 'blog not found'})
            }
          }
        });
      } else {
        res.send({sign: false, msg: 'you have not logined'});
      }
    }
  });
});

router.post('/api/blog/deleteBlog', (req, res) => {
  models.User.find({username : req.body.username},
    (err, data) => {
    if (err) {
      res.send({error: 'Something wrong'});
    } else {
      if (data.length != 1 || !data[0].signed) {
        res.send({error: 'you can not edit others blog'});
      } else {
        models.Blog.remove({_id: req.body.id},
        (err,data) => {
          if (err) {
            res.send({error: 'Something wrong happened'});
          } else {
            if (data.n != 1) {
              res.send({error: 'did not find the blog'});
            } else {
              res.send({error: null})
            }
          }
        })
      }
    }
  })
});

router.post('/api/blog/hideBlog', (req, res) => {
  //next({error: "wwww"});
  models.User.find({username : req.body.username},
    (err, data) => {
    if (err) {
      res.send({error: 'Something wrong'});
    } else {
      if (data.length != 1 || !data[0].signed) {
        res.send({error: 'not signed'});
      } else if (req.body.username !== admin) {
        res.send({error: 'no right to operate'});
      } else {
        models.Blog.find({_id : req.body.id},
          (err, data) => {
          if (err) {
            res.send({error: 'the blog is not found'});
          } else {
            if (data.length !== 1) {
              res.send({error: 'the blog is not found'});
            } else {
              let signForHide = !data[0].hide;
              models.Blog.update({_id : req.body.id}, {hide: signForHide},
                (err, data) => {
                if (err) {
                  res.send({error: 'something wrong'});
                } else {
                  if (data.n == 1) {
                    res.send({'error': null});
                  } else {
                    res.send({error: 'the blog is not found'});
                  }
                }
              })
            }
          }
        })
      }
    }
  })
});

router.post('/api/blog/editBlog', (req, res) => {
  var d = new Date();
  let params = {
    lastedit: d.toLocaleString()
  };
  if(req.body.title!=undefined) {
    params['title'] = req.body.title;
  }
  if(req.body.content!=undefined) {
    params['content'] = req.body.content;
  }

  var sql = 'select uid from user where name = ?';
  var param = [req.body.author];
  connection.query(sql,param,function (err, result) {
    if(err){
      res.send({sign: false, msg: 'something is wrong'});
      return;
    } else {
      if(result.length == 1) {
        params['uid'] = result[0].uid;

        if (req.body.state == 1) {
          //edit
          sql = 'update blog set title = ?, content = ?, lastedit = ? where bid = ?';
          param = [params.title, params.content, params.lastedit, params.id];
          connection.query(sql,param,function (err, result) {
            if(err){
              res.send({sign: false, msg: 'something is wrong'});
            } else {
              console.log('update blog :');
              console.log(result);
              if(result.affectedRows == 1)
                res.send({sign: true, data: result[0], msg: ''});
              else {
                res.send({sign: false, msg: 'Something wrong happened'});
              }
            }
          });
        } else {
          //add
          params['bid'] = UUID.v1();
          sql = 'insert into blog(bid, uid, title, content, lastedit) values(?,?,?,?,?)';
          param = [ params.bid, params.uid, params.title, params.content, params.lastedit];
          connection.query(sql,param,function (err, result) {
              if(err){
                console.log('new blog : false');
                console.log(err);
                res.send({sign: false, msg: 'Something wrong happened'});
              } else {
                console.log('new blog : successed');
                console.log(result);
                res.send({sign: true, msg: params.bid});
              }
          });
        }
      } else {
        res.send({sign: false, msg: 'you have not logined'});
        return;
      }
    }
  });
});

router.post('/api/blog/commentAtBlog', (req,res) => {
  models.User.find({username : req.body.username},
  (err, data) => {
    if(err) {
      res.send({error: 'Something wrong'});
    } else {
      if (data.length!=1 || !data[0].signed) {
        res.send({error: 'user not exist or has not logined'})
      } else {
        models.Blog.find({_id : req.body.blogId},
          (err, blog) => {
          if (err) {
            res.send({error: 'Something wrong'});
          } else {
            if (blog.length != 1) {
              res.send({error: 'the blog is not found'})
            } else if (req.body.commentId==null &&!!req.body.changeHideState) {
              res.send({error: 'Something wrong'})
            } else {
              var d = new Date();
              let params= {
                comments : blog[0].comments,
                totalComment: blog[0].totalComment
              };
              let newComment = {
                lastedit: d.toLocaleString(),
                speaker: req.body.username,
                content: req.body.comment
              }

              if (req.body.commentId == null) {
                //new one
                newComment['id']= ++params.totalComment;
                newComment['hide']= false;
                params.comments.push(newComment);
              } else {
                //edit
                let temp_blogIndex = params.comments.findIndex((temp) => {
                  return temp.id == req.body.commentId
                });
                if (temp_blogIndex == -1) {
                  res.send({error: 'the comment not exist'})
                  return;
                } else if (req.body.username!== admin && req.body.username !== params.comments[temp_blogIndex].speaker) {
                  res.send({error: 'can not edit others comment'});
                  return;
                } else {
                  newComment['id']= params.comments[temp_blogIndex].id;
                  newComment['hide']= params.comments[temp_blogIndex].hide;
                  if (req.body.username == admin && req.body.changeHideState) {
                    newComment['hide']= !newComment['hide'];
                    newComment['lastedit']= params.comments[temp_blogIndex].lastedit;
                    newComment['content']= params.comments[temp_blogIndex].content;
                    newComment['speaker']= params.comments[temp_blogIndex].speaker;
                  }
                  params.comments[temp_blogIndex]=newComment;
                }
              }

              models.Blog.update({_id: req.body.blogId}, params,
                (err,data) => {
                  if (err) {
                    res.send({error: 'Something wrong'})
                  } else {
                    res.send({error: null});
                  }
                })
            }
          }
        })
      }
    }
  })
}),

router.post('/api/blog/deleteComment', (req, res) => {
  models.User.find({username : req.body.username},
  (err, data) => {
    if(err) {
      res.send({error: 'Something wrong'});
    } else {
      if (data.length!=1 || !data[0].signed) {
        res.send({error: 'user not exist or has not login'})
      } else {
        models.Blog.find({_id : req.body.blogId},
          (err, blog) => {
          if (err) {
            res.send({error: 'Something wrong'});
          } else {
            if (blog.length!=1) {
              res.send({error: 'the blog is not found'})
            } else {
              var temp_blogIndex=blog[0].comments.findIndex((temp) => {
                return temp.id == req.body.commentId
              });
              if(temp_blogIndex == -1) {
                res.send({error: 'the comment is not exist'})
              } else if (blog[0].comments[temp_blogIndex].speaker != req.body.username) {
                res.send({error: 'you can not edit others comment'})
              } else {
                blog[0].comments.splice(temp_blogIndex, 1);
                models.Blog.update({_id: req.body.blogId},
                  {comments: blog[0].comments},
                  (err,data) => {
                    if (err) {
                      res.send({error: 'Something wrong'})
                    } else {
                      res.send({error: null});
                    }
                  })
              }
            }
          }
        })
      }
    }
  })
}),

router.post('/api/main/bloglist', (req, res) => {
  models.Blog.find({title: new RegExp(req.body.searchString)},(err,data) =>{
    if (err) {
        res.send({error: 'Something wrong'});
    } else {
      data.sort((a, b) => {
        return a.lastedit < b.lastedit;
      });
      let blogList = new Array();
      for (var i = 0; i < data.length; i++) {
        blogList.push({
          _id: data[i]._id,
          title: data[i].title,
          author: data[i].author,
          lastedit: data[i].lastedit,
          totalComments: data[i].comments.length
        })
      }
      res.send({error: null,blog: blogList.slice((req.body.page - 1) * blogInPage, req.body.page * blogInPage),
      totalPage: Math.ceil(data.length/blogInPage)});
    }
  });
});

module.exports = router;
