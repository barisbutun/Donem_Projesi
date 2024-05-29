const images = {};
const importAll = (r) => {
  r.keys().forEach((key) => {
    images[key.replace('./', '')] = r(key);
  });
};

importAll(require.context('../Urunler', false, /\.(png|jpe?g|svg)$/));

export default images;