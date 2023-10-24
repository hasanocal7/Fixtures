exports.getHomePage = (req, res) => {
    res.render('index', {
        page_name: "home"
    });
}

exports.getAboutPage = (req, res) => {
    res.render('about', {
        page_name: "about"
    });
}

exports.getFurnituresPage = (req, res) => {
    res.render('furnitures', {
        page_name: "furnitures"
    });
}

exports.getContactPage = (req, res) => {
    res.render('contact', {
        page_name: "contact"
    });
}
exports.getLoginPage = (req, res) => {
    res.render('login', {
        page_name: "login"
    });
}

exports.getRegisterPage = (req, res) => {
    res.render('register', {
        page_name: "register"
    });
}
