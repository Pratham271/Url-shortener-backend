const {Router} = require('express')
const { Url } = require('../db')

const router = Router();

function RandomTag(len){
const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomId = '';
  for (let i = 0; i < 6; i++) {
    randomId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return randomId;
}
router.post('/short', async(req,res)=> {
    const url = req.body.url;
   try {
    const tag = RandomTag()
    const dbUrl = await Url.findOne({url})

    if(dbUrl){
        return res.status(200).json({
            shortenUrl: dbUrl.tag
        })
    }
    const shorten = await Url.create({
        tag:tag,
        url:url
    })
    res.status(201).json({
        shortenUrl: shorten.tag
    })
   } catch (error) {
        res.status(500).json({
            errorMessage: error.message
        })
   }

})

router.get('/:id', async(req,res)=> {
    const id = req.params.id;
    try {
        const shorten = await Url.findOne({
            tag:id
        })
        if(!shorten){
            return res.status(400).json({
                message: "wrong url entered"
            })
        }
        res.redirect(shorten.url)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

module.exports = router
