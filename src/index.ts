import fastify from "fastify";
import cheerio from "cheerio";

const json = require("./detran.json");

const app = fastify({ logger: true });

app.get("/", async (req, res) => {
  const response = {
    questions: [] as any,
  };
  const $ = cheerio.load(json.content);

  $(".wpProQuiz_listItem").each(function (index, element) {
    const title = $(element).find(".wpProQuiz_question_text").text().trim();

    console.log("title", title);

    response.questions.push({
      title,
    });
  });

  return response;
});

const start = async () => {
  try {
    await app.listen(3000);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
