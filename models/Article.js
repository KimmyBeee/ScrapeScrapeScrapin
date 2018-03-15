const mongoose = require("mongoose");

const ArticleSchema = new Schema({
	title: {
	type: String,
	required: true
	},
	link: {
		type: String,
		required: true
	},
	note: {
		type: Schema.Types.ObjectId,
		ref: "Note"
	}
});

export default mongoose.model("Article", ArticleSchema);

