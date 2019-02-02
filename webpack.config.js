const HtmlWebpackPlugin= require("html-webpack-plugin");

module.exports={
  module:{
    rules:[
       {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ]
};
