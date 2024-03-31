using Donem_Projesi.Model;
using Repositories.Concrats;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.EFCore
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly RepositoryContext _context;
        private readonly Lazy<ITradeRepository> _iadeRepository;
        private readonly Lazy<ITradeRepository> _urunlerRepository;
        private readonly Lazy<ITradeRepository> _siparisRepository;
        private readonly Lazy<ITradeRepository> _sepetRepository;
        private readonly Lazy<ITradeRepository> _musteriRepository;

        public RepositoryManager(RepositoryContext context) 
        {
            _context = context;
            _iadeRepository = new Lazy<ITradeRepository>(() => new TradeRepository(_context));
           
            _urunlerRepository = new Lazy<ITradeRepository<Urunler>>(() => new TradeRepository<Urunler>(_context));
            _siparisRepository = new Lazy<ITradeRepository<Siparis>>(() => new TradeRepository<Siparis>(_context));
            _sepetRepository = new Lazy<ITradeRepository<Sepet>>(() => new TradeRepository<Sepet>(_context));
            _musteriRepository = new Lazy<ITradeRepository<Musteri>>(() => new TradeRepository<Musteri>(_context));
        }


        public ITradeRepository<İade> İadeRepository => _iadeRepository.Value;
        public ITradeRepository<Urunler> UrunlerRepository => _urunlerRepository.Value;
        public ITradeRepository<Siparis> SiparisRepository => _siparisRepository.Value;
        public ITradeRepository<Sepet> SepetRepository => _sepetRepository.Value;
        public ITradeRepository.Musteri MusteriRepository => _musteriRepository.Value;
        public void Save()
        {
            _context.SaveChanges();
        }
    }
}