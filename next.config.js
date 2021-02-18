const { map } = require("ramda")
const { config } = require("./src/config")

module.exports = {
    async rewrites() {
        const getRewrite = (category) => {return {source: '/' + category, destination: '/categories/' + category}};

        return map(getRewrite, config("categories"));
    },
  }