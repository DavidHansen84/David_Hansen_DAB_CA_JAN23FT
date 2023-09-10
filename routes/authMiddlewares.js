module.exports = {
  isMember: function(req, res, next) {
    if(req.user.role === "member") {
        next();
        return;
    }
    else {
        res.status(401).send(new Error());
    }
},
isAdmin: function(req, res, next) {
  if(req.user.role === "admin") {
      next();
      return;
  }
  else {
      res.status(401).send(new Error());
  }
},
isAdopted: function(req, res, next) {
  if(req.animal.adopted === "False") {
      next();
      return;
  }
  else {
      res.status(401).send(new Error());
  }
},
checkIfAuthorized: function(req, res, next) {
      if(req.user == null) {
          res.status(401).send(new Error());
          return;
      }
      if(req.user.role == "Admin" || req.user.role == "User")
          next();
  },
  canSeeUserDetails: function (req, res, next) {
      if (req.user != null)
        if(req.user.role === "Admin" || req.user.id == req.params.userId) {
          next()
          return;
        }
      res.redirect('/login');
    },
    canSeeUserList: function (req, res, next) {
      if (req.user != null)
        if(req.user.role === "Admin") {
          next()
          return;
        }
      res.redirect('/login');
    }
  }