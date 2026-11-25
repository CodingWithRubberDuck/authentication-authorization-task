async function hello(req, res){
    res.json({message: 'Welcome', userId: req.user.id})
}

module.exports = {hello}