const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    res.end(
      JSON.stringify({
        status: "healthy"
      })
    );

    return;
  }

  res.writeHead(200, {
    "Content-Type": "text/html"
  });

  res.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Sample GitOps Application</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin-top: 100px;
          }

          h1 {
            color: #333;
          }

          .box {
            margin: auto;
            padding: 30px;
            max-width: 600px;
            border: 1px solid #ddd;
            border-radius: 10px;
          }
        </style>
      </head>

      <body>
        <div class="box">
          <h1>🚀 Sample GitOps Application</h1>

          <p>
            Jenkins → ECR → Git → Argo CD → EKS
          </p>

          <p>
            Application is running successfully.
          </p>
        </div>
      </body>
    </html>
  `);
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Application running on port ${PORT}`);
});