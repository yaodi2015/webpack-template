const pxtorem = require("postcss-pxtorem");//for ali 高清配置
const autoprefixer = require("autoprefixer");
module.exports = {
	plugins: [
		autoprefixer,
		pxtorem({
			rootValue: 100
		})
  ]
};
