import fastify from "fastify";
import cheerio from "cheerio";
import fs from "fs";

const json = require("./rawData/detran7.json");

const app = fastify({ logger: true });

app.get("/", async (req, res) => {
  const response = {
    questions: [] as any,
  };

  const $ = cheerio.load(json.content);

  $(".wpProQuiz_listItem").each(function (index, element) {
    const title = $(element).find(".wpProQuiz_question_text").text().trim();
    const image = $(element).find(".wpProQuiz_question_text img").attr("src");

    let alternatives = $(element)
      .find(".wpProQuiz_questionList")
      .text()
      .split("  ");

    alternatives = alternatives.map((option) => {
      let validOption = [];
      if (option.includes(".")) validOption.push(option);
      return validOption.toString().replace(".", "").trim();
    });
    alternatives = alternatives.filter((notNullQuestion: any) => {
      return notNullQuestion;
    });

    let questionId: any = $(element)
      .find(".wpProQuiz_questionList")
      .data("question_id");
    let correctOption = json.json[questionId].correct;
    correctOption = correctOption.indexOf(1) + 1;

    console.log("title", title);
    console.log("alternative", alternatives);
    console.log("correctOption", correctOption);

    response.questions.push({
      title,
      alternatives,
      correctOption,
      image: !!image ? image : undefined,
    });
  });

  const responseJson = JSON.stringify(response);
  fs.writeFile("src/exams/exam7.json", responseJson, "utf8", function (err) {
    if (err) console.log(err);
    else console.log("data was saved!");
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
