function Kategoriler({ kategoriler }) {
    return (
      <section className="kategoriler">
        <h2>Kategoriler</h2>
        <ul>
          {kategoriler.map((kategori) => (
            <li key={kategori.id}>
              <a href="#">{kategori.adi}</a>
            </li>
          ))}
        </ul>
      </section>
    );
  }
  
  export default Kategoriler;