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
}
  }