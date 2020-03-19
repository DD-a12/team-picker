const express = require('express');
const router = express.Router();
const queries = require("../db/queries")

router.get('/', (req, res ) => {
  res.render("home_page")    
});

router.get('/new_cohort', (req, res ) => {
  res.render('new_cohort');
});

router.get("/cohorts/:id/update", (req, res, next) => {
  const { id } = req.params;
  queries.getOne(id).then(cohort => {
      res.render("update",{cohort})
  });
});

router.get('/cohorts', (req, res ) => {
  queries.getAll().then(cohorts =>{
    res.render("cohorts",{cohorts})    
    })
});

router.get("/cohorts/:id", (req, res, next) => {
  const { method , quantity } = req.query
  const { id } = req.params;
  queries.getOne(id).then(cohort => {
    if (cohort) {
      res.render("show_cohort",{cohort,method,quantity })
    } else {
      res.status(404);
      next(new Error("Record Not Found"));
    }
  });
});


router.post("/new_cohort", (req,res,next) =>{
  if(req.body.teamname.trim() ===""){
    res.status(401);
    next(new Error("There should be content"))
  } else{  queries.create({
        teamName: req.body.teamname,
        members: req.body.members,
        imageUrl: req.body.logoUrl 
      }).then(cohorts =>{
        res.redirect("/cohorts");
      })
  }
})
router.put("/cohorts/:id/update", (req,res,next) =>{
      delete req.body._method;
      queries.update(req.params.id, req.body).then(()=>{
          res.redirect(`/cohorts/${req.params.id}`)
      });
});
router.delete("/cohorts/:id", (req,res,next) =>{
    queries.delete(req.params.id).then( () =>{
      res.redirect("/cohorts");
    })
});
module.exports = router;
