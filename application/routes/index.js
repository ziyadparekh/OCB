exports.index = function(req, res){
  res.send({meta: 200,
      response: {
          name: process.env.DB_NAME+"-web",
          status: "ok",
          message: "All systems go!"
      },
      error: null
  });
};

exports.login = function(req, res){
    res.render('login');
}

exports.login2 = function(req, res){
    res.render('login2');
}
