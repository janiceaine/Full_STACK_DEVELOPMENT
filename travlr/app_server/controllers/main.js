/* GET Homepage */
const index = (req, res) => {
    console.log("I came here first");
    res.render('index', { title: "Travlr Getaways" });
};

module.exports = {
    index
};