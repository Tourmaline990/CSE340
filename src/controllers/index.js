// imports

// controller functions
const showHomePage = async (req, res) => {
   const title = 'Home'
   res.render('home',{title})
}

// exports
export{showHomePage}