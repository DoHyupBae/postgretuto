// import required modules
const express = require("express");
const { Pool } = require("pg"); // postgresql 파싱하는 api
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

const pool = new Pool({
  user: "*****",
  host: "localhost",
  database: "webapp",
  password: "*****",
  port: 5432,
}); /

app.use(express.static(path.join("")));
// express.static() 미들웨어를 통해 정적 파일을 등록하는 기능을 추가합니다. 정적 파일을 제공할 루트 디렉터리를 지정.

app.use(bodyParser.urlencoded({ extended: false }));
//앱에서 보낸 HTML 요청을 구문 분석해야 합니다.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "", "index.html"));
});
//루트 URL('/')에 대한 경로 핸들러를 설정. 루트 URL에 GET 요청이 이루어지면 서버는 동일한 디렉터리에 있는 "index.html" 파일을 전송하여 응답.

app.get("/students", (req, res) => {
  const query = "SELECT * FROM student;";
  pool.query(query, (error, result) => {
    if (error) {
      console.error("Error occurred:", error);
      res
        .status(500)
        .send("An error occurred while retrieving data from the database.");
    } else {
      const students = result.rows;
      res.json(students);
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
