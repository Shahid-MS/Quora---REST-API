const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

//port
let port = 8080;

//ejs
app.set("view engine", "ejs");
app.use("/data", express.static("data"));
app.set("views", path.join(__dirname, "/views"));

//for getting other methods
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//uuid
const { v4: uuidv4 } = require("uuid");

//creating two posts
let posts = [];
posts.push({
  id: uuidv4(),
  username: "MS 2.O",
  heading: "Build low-cost web applications with AWS.",
  content:
    "You can use whatever CMS you like, including WordPress, Drupal, and more. Get started for free.",
  createdAt: `Last Updated ${new Date().getSeconds()} minutes ago`,
});
posts.push({
  id: uuidv4(),
  username: "PS",
  heading: "Build low-cost web applications with web dev.",
  content: "You can use whatever HTML CSS and JavaScript you like.",
  createdAt: `Last Updated ${new Date().getSeconds()} minutes ago`,
});

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/posts", (req, res) => {
  //   console.log(posts);
  //   console.log(posts.length);
  res.render("posts.ejs", { posts });
});

app.get("/posts/:id", (req, res) => {
  // console.log("Get", req.params);
  let { id } = req.params;
  let post = posts.find((p) => {
    return id == p.id;
  });
  let randImg =
    "https://source.unsplash.com/random/300x200?sig=${Math.random()}";
  //   console.log(post);

  res.render("post", { post, randImg });
});

//Adding new Posts
app.get("/posts/add/new", (req, res) => {
  res.render("addNew.ejs");
});

app.post("/posts", (req, res) => {
  // console.log(req.body);
  let { username, heading, content } = req.body;
  posts.push({
    id: uuidv4(),
    username: username,
    heading: heading,
    content: content,
    createdAt: `Last Updated ${new Date().getSeconds()} minutes ago`,
  });
  res.redirect("/posts");
});

//Update Posts
app.get("/posts/update/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => {
    return id == p.id;
  });
  res.render("updateForm.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  // console.log("patch", req.params);
  // console.log("patch", req.body);
  let { id } = req.params;
  let { heading: newHeading, content: newContent } = req.body;
  let post = posts.find((p) => {
    return id == p.id;
  });
  post.heading = newHeading;
  post.content = newContent;
  res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
  // console.log("delete", req.params);
  let { id } = req.params;

  posts = posts.filter((p) => {
    return p.id != id;
  });

  // console.log(posts);
  res.redirect("/posts");
});

app.listen(port, () => {
  console.log("App is listening on port", port);
});
