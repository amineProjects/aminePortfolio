const path = require("path");
const HtmlWebpackPlugin= require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin= require("clean-webpack-plugin");
const imageminMozjpeg= require("imagemin-mozjpeg");
const ImageminPlugin= require("imagemin-webpack-plugin").default;
const CopyWebpackPlugin= require("copy-webpack-plugin");

module.exports=(env,argv) =>{

  let proMode=argv.mode == "production",
      clean,
      minifySetting=proMode ?{
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      } : {},
      postcssPlugins=[ require('autoprefixer')],
      plugins;

      plugins= [
      new MiniCssExtractPlugin({
        filename: proMode ? "../css/style.[contenthash].css" : "../css/style.css"
      }),
      new HtmlWebpackPlugin({
        inject:false,
        minify:minifySetting,
        template: './src/pages/about.html',
        filename: '../pages/about.html'
      }),
      new HtmlWebpackPlugin({
        inject:false,
        minify:minifySetting,
        template: './src/pages/contact.html',
        filename: '../pages/contact.html'
      }),
      new HtmlWebpackPlugin({
        inject:false,
        minify:minifySetting,
        template: './src/pages/credit.html',
        filename: '../pages/credit.html'
      }),
      new HtmlWebpackPlugin({
        inject:false,
        minify:minifySetting,
        template: './src/pages/work.html',
        filename: '../pages/work.html'
      }),
      new HtmlWebpackPlugin({
        inject:false,
        minify:minifySetting,
        template: './src/index.html',
        filename: '../index.html'
      }),
      new CopyWebpackPlugin([{
        from: './src/images',
        to: '../images'
      }
      ]),
      new ImageminPlugin({
        disable: argv.mode == 'development',
        pngquant:({quality: '60'}),
        plugins: [imageminMozjpeg({quality: '60'})]
      }),
      new CopyWebpackPlugin([{
        from: './src/icons',
        to: '../icons'
      },
      {
        from: './src/browserconfig.xml',
        to: '../'
      },
      {
        from: './src/favicon.ico',
        to: '../'
      },
      {
        from: './src/fonts',
        to: '../fonts'
      },
      {
        from: './src/manifest.json',
        to: '../'
      }
      ])];

      if(proMode){
        clean=new CleanWebpackPlugin(['dist'],{beforeEmit: true});plugins.unshift(clean);
        postcssPlugins.push(require('postcss-clean'));
      }

   return {
    entry: {
      main:'./src/js/index.js',
      home:'./src/js/currentSlide.js'
    },
    output: {
      path: path.resolve(__dirname, './dist/js/'),
      filename: proMode ? '[name].[contenthash].js' : '[name].js'
    },
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
          test: /\.scss$/,
          use: [
            'style-loader',
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options:{url:false}
            },
            {
              loader:'postcss-loader',
              options:{ plugins:postcssPlugins}
            },
            'sass-loader'
          ]
        }
      ]
    },
    plugins: plugins
  }

};
