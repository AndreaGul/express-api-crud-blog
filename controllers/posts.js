
const posts = require('../db/posts.json');
const { readJSON } = require('../utils');
const path = require("path");
const fs = require("fs");

const index = (req, res) => {
    
    res.format({
      html: () => {
        let html = '<main><ul>';
        posts.forEach(({ titolo, contenuto, immagine, tags, slug }) => {
          html += `
          <li>titolo: ${titolo}</li>
          <li>${contenuto}</li>
          <li><img width="200px" src="/${immagine}"/></li>
          <li>tags: ${tags}</li>
          <li>tags: ${tags}</li>
          <li><a href="/posts/${ slug }" > Visualizza post </a></li><br></br>`;
          
        });
        html += '</ul><main>';
        res.send(html);
      },
      json: () => {
        res.json(posts);
      },
    });
  }

const show =(req,res)=>{
  const slugPostsRichiesto = req.params.slug;
  const postRichiesto= posts.find( post => post.slug === slugPostsRichiesto);
  
  res.format({ 
    html: () => {
      const { titolo, contenuto, immagine, tags, slug } = postRichiesto;
      let html = '<main><ul>';
      html += `
        <li>titolo: ${titolo}</li>
        <li>${contenuto}</li>
        <li><img width="200px" src="/${immagine}"/></li>
        <li>tags: ${tags}</li>
        <li><a href="/${immagine}" target="_blank"> Visualizza immagine</a> </li>
        <li><a href="/posts/${ slug }/download" target="_blank"> Scarica immagine </a></li>`;
        
      html += '</ul><main>';
      res.send(html);
    },
    json:()=>{
    if(postRichiesto){
      res.json({
        ...postRichiesto,
        
      });
    }else{
      res.status(404).json({
        error: 'Not Found',
        description: `Non esiste un post con slug ${slugPostsRichiesto}`
      })
    }
  }})
 
}

const create = (req,res)=>{
  res.format({
    html:()=>{ 
      res.send("<h1>Creazione nuovo post</h1>");
    },
    default:()=>{
      res.status(406).send({
        error:"Not found",
        description: `Richiesta non valida in json`
      })
    }
  })
 
}

const download = (req,res)=>{

  const slugPostsRichiesto = req.params.slug;
  const postRichiesto= posts.find( post => post.slug === slugPostsRichiesto);
  if (!slugPostsRichiesto) {
    return res.status(400).send('parametro del file mancante');
  }
  const imgPath = path.join(__dirname, `../public/${postRichiesto.immagine}`);
  const extension = path.extname(imgPath);
  if(extension !== '.jpeg'){
    res.status(400).send(`Accesso negato a ${extension}`);
  }else if(fs.existsSync(imgPath)){
    res.download(imgPath);
  }else{
    res.status(404).send('File not found');
  }
}

module.exports ={
  index,
  show,
  create,
  download
}