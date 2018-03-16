const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");

const db = require("./models");
const PORT = 3000;
const app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/ScrapeScrapeScrapin");

//Routes

app.get("/scrape", function(req, res)	{
	axios.get("http://www.nytimes.com").then(function(response)	{
		const $ = cheerio.load(html);
		$("h2.story-heading").each(function(i, element)	{
			var result = {};
			const link = $(element).children().attr("href");
			const title = $(element).children().text();

			db.Article.create(result)
				.then(function(dbArticle)	{
					console.log(dbArticle);
				})
				.catch(function(err)	{
					return res.json(err);
				});
		});
		res.send("Scrape Successfully Completed!");
	});
});

app.get("/articles", function(req, res)	{
	db.Article.find({})
		.then(function(dbArticle)	{
			res.json(dbArticle);
		})
		.catch(function(err)	{
			res.json(err);
		});
});

app.post("/articles:id", function(req, res)	{
	db.Note.create(req.body)
		.then(function(dbNote)	{
			return db.Article.findOneAndUpdate({ _id: req.params.id }, {note: dbNote._id }, { new: true });
		})
		.then(function(dbArticle)	{
			res.json(dbArticle);
		});
});

app.listen(PORT, function()	{
	console.log("App running on port " + PORT + "!");
})