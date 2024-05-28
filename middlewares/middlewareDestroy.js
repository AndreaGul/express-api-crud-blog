let posts = require('../db/posts.json');

const updatePosts = (nuoviPost) => {
  const filePath= path.join(__dirname, '../db/posts.json');
  fs.writeFileSync(filePath, JSON.stringify(nuoviPost))
  posts = nuoviPost;
}


const destroy = (err,req,res,next)=>{
    const {slug}= req.params;
    const postDaEliminare = posts.find(post => post.slug === slug);
    if(!postDaEliminare){
      return res.status(404).send('nessun post corrispondente');
    }
    const postAggiornati= posts.filter(post => post !== postDaEliminare);
    updatePosts(postAggiornati);
  
    res.format ({
      html: ()=>{
        res.status(200).redirect('/');
      },default:()=>{
        res.status(200).send('post eliminato');
      }
    })
    next()
  }
  
  module.exports={
    destroy,
  }