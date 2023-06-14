const User = require("../models/user");

// function to render profile page
module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "User Profile",
    profile_user: req.user,
  });
};



// function to render the Sign In page
module.exports.signIn = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/dashboard");
  }
  return res.render("signin");
};

// render the Sign Up page
module.exports.signUp = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/profile");
  }
  return res.render("signup",{
    title:'Sign Up'
  });
};

// creating up a new user
module.exports.create = async (req, res) => {
  try {
    const { username, email, password, confirm_password } = req.body;

    // if password doesn't match
    if (password != confirm_password) {
      return res.redirect("back");
    }

    // check if user already exist
    User.findOne({ email }, async (err, user) => {
      if (err) {
        console.log("Error in finding user in signing up");
        return;
      }

      if (!user) {
        await User.create(
          {
            email,
            password,
            username,
          },
          (err, user) => {
            if (err) {
              console.log("error", "Couldn't sign Up");
            }
            return res.redirect("/");
          }
        );
      } else {
        console.log("error", "Email already registed!");
        return res.redirect("back");
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// sign in and create a session for the user
module.exports.createSession = (req, res) => {
  return res.redirect("/profile");
};

// clearing the cookie
module.exports.destroySession = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.redirect("/");
  });
};
