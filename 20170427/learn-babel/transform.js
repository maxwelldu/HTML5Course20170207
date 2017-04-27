/**
 * Created by sks on 2017/4/27.
 */
require("babel-core").transformFile("main.js", {
  plugins: ["transform-es2015-arrow-functions"]
});