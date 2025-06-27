// register.js
const fetch = require("node-fetch");

const register = async () => {
  const response = await fetch("http://20.244.56.144/evaluation-service/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: "joinkumarakshay7@gmail.com",
      name: "kumar Akshay",
      mobileNo: "7488455190",
      githubUsername: "kr-akshayy",
      rollNo: "22131012562",
      accessCode: "Muagvq"
    })
  });

  const data = await response.json();
  console.log("✅ Registration Response:\n", data);
};

register();
