let posts = require('./db/posts.json');
const path = require('path');
const fs = require('fs');
const slugify = require('slugify');


const readJSON = (fileName) => {
  const filePath = path.join(__dirname, 'db', `${fileName}.json`);
  const json = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(json);
};
const writeJSON = (filename, data) => {
  const filePath = path.join(__dirname, 'db', `${filename}.json`);
  const json = JSON.stringify(data);
  fs.writeFileSync(filePath, json);
};

const updatePosts = (nuoviPost) => {
  const filePath= path.join(__dirname, './db/posts.json');
  fs.writeFileSync(filePath, JSON.stringify(nuoviPost))
  return nuoviPost;
}


const generateSlug= (name)=>{
  baseSlug= slugify(name, { replacement: '-', lower: true, strict: true });
  slugs = posts.map(post => post.slug);
  let counter = 1;
  let slug = baseSlug;
  while(slugs.includes(slug)){
    slug= `${baseSlug}-${counter}`;
    counter ++
  }
  return slug
}


const eliminaFile = (filename)=>{
  const filePath = path.join(__dirname, './public', filename);
  fs.unlinkSync(filePath);
}

module.exports = {
  readJSON,
  writeJSON,
  updatePosts,
  generateSlug,
  eliminaFile
};
