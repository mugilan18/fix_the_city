const router = require('express').Router();
let fs = require('fs');
router.post('/', async (req, res) => {

    fs.readFile('adminres.json', function (err, content) {
        if (err) throw err;
        const result = JSON.parse(content)
        result.push(req.body)
        fs.writeFile("adminres.json", JSON.stringify(result), function (err) {
            if (err) throw err;
            console.log("mess", result);
        })
    });
    res.status(200).json({ "pass": "pass" });
})


router.get('/', async (req, res) => {
    fs.readFile('adminres.json', function (err, content) {
        if (err) throw err;
        const result = JSON.parse(content)
        res.json({ "passed": result });
    })

});

module.exports = router;
