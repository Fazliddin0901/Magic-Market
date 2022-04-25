const fs = require("fs");
const url = require("url");
const http = require("http");
const render = require("./modules/render.js");

let home = fs.readFileSync("./pages/home.html", "utf-8");
let card = fs.readFileSync("./pages/card.html", "utf-8");
let buy = fs.readFileSync("./pages/buy.html", "utf-8");
let reco = fs.readFileSync("./pages/recomendation.html", "utf-8");
let api = fs.readFileSync("./API/product.json", "utf-8");
let dataJson = JSON.parse(api);

const server = http.createServer((req, res) => {
  let urlcha = req.url;
  let urlParse = +url.parse(urlcha, true).query.id;
  // console.log(urlParse);

  let dataCards = dataJson
    .map((val) => {
      return render(card, val);
    })
    .join("");
  home = home.replace("{cardss}", dataCards);

  if (urlcha == "/" || urlcha == "/home") {
    // console.log(dataCards);
    res.writeHead(200, {
      content_type: "text/html",
    });
    res.end(home);
  } else {
    if (urlcha == `/buy?id=${urlParse}`) {
      res.writeHead(200, {
        content_type: "text/html",
      });

      let obj = dataJson.find((val) => {
        return val.id == urlParse;
      });
      let sotibOl = render(buy, obj);

      // if (urlcha == `/buy?id=${urlParse}`) {
      //   res.writeHead(200, {
      //     content_type: "text/html",
      //   });
      let category = obj.category;
      console.log(category);
      let categor = [];
      for (let i = 0; i < dataJson.length; i++) {
        if (dataJson[i].category == category && dataJson.id !== urlParse) {
          categor.push(dataJson[i]);
        }
      }
      console.log(categor);
      console.log(reco);
      let recom = categor
        .map((val) => {
          return render(reco, val);
        })
        .join("");
      console.log(recom);
      let data = sotibOl.replace("{recomendatsiya}", recom);
      res.end(data);
      // //   let recom = render(reco, obj);
      //   res.end(recom);
      // } else {
      //   res.writeHead(404, { "content-type": "text/html" });
      //   res.end("<h1 style='color:red;'>Page not found</h1> ");
      // }
    } else {
      res.writeHead(404, { "content-type": "text/html" });
      res.end("<h1 style='color:red;'>Page not found</h1> ");
    }
  }
});

server.listen("8000", "127.0.0.1");
