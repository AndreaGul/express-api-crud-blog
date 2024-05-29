let posts = require('../db/posts.json');

const destroy = (req, res,next) => {
    const { slug } = req.params;
    
    const postDaEliminare = posts.find(post => post.slug === slug);

    if (!postDaEliminare) {
      return res.status(404).send('nessun post corrispondente');
    }
    req.postDaEliminare = postDaEliminare;
    next()
   
  };
  
  module.exports ={
    destroy
  }