const path = require("path");

module.exports = {
  entry: "./src/index.js", // Punto de entrada
  output: {
    filename: "bundle.js", // Archivo de salida
    path: path.resolve(__dirname, "dist"), // Directorio de salida
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Regla para archivos JavaScript
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  mode: "development", // Puedes cambiar a 'production' para optimización
};
