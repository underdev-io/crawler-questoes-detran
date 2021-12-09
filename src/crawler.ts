
//const cheerio = require('cheerio');
import fetch from 'node-fetch';
import axios from 'axios';

async function scrap () {
    const request = await axios.post("https://www.autoescolaonline.net/wp-admin/admin-ajax.php", {
        "headers": {
          "accept": "application/json, text/javascript, */*; q=0.01",
          "accept-language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
          "sec-ch-ua-mobile": "?1",
          "sec-ch-ua-platform": "\"Android\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
          "cookie": "_gcl_au=1.1.936782837.1638481785; _ga=GA1.2.1210682186.1638481786; _gid=GA1.2.177244200.1638922082; _gat_gtag_UA_35965006_1=1; __atuvc=11%7C48%2C5%7C49; __atuvs=61aff761d180ff04004",
          "Referer": "https://www.autoescolaonline.net/provas-simuladas/materia-geral/",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": "action=wp_pro_quiz_admin_ajax&func=quizLoadData&data%5BquizId%5D=14"
      });

      if(!request)
        console.log('err');
      
        console.log(request);
      

}

    export default scrap;
