using AutoMapper;
using Entities.DataTransferObject;
using Entities.Exceptions;
using Entities.Model;
using Repositories.Concrats;
using Services.Concrat;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class ReturnManager:IReturnService
    {
        private readonly IRepositoryManager _manager;
        private readonly ILoggerService _logger;
        private readonly IMapper _mapper;

        public ReturnManager(IRepositoryManager manager, ILoggerService logger, IMapper mapper)
        {
            _manager = manager;
            _logger = logger;
            _mapper = mapper;
        }

        public İade CreateOneReturn(İade returnEntity)
        {
            _manager.İade.CreateOneReturn(returnEntity);
            _manager.Save();
            return returnEntity;
        }

        public void DeleteOneReturn(int id, bool trackChanges)
        {
            var entity = _manager.İade.GetOneReturnById(id, trackChanges);
            if (entity == null)
            {
                throw new ReturnNotFoundException(id);
            }
            _manager.İade.DeleteOneReturn(entity);
            _manager.Save();
        }

        public IEnumerable<İade> GetAllReturn(bool trackChanges)
        {
            return _manager.İade.GetAllReturn(trackChanges);
        }

        public İade GetOneReturnById(int id, bool trackChanges)
        {
            var returnEntity = _manager.İade.GetOneReturnById(id, trackChanges);
            if (returnEntity == null)
            {
                throw new ReturnNotFoundException(id);
            }
            return returnEntity;
        }

        public void UpdateOneReturn(int id, ReturnDtoForUpdate returnDto, bool trackChanges)
        {
            var entity = _manager.İade.GetOneReturnById(id, trackChanges);

            if (entity == null)
            {
                throw new ReturnNotFoundException(id);
            }

            entity = _mapper.Map<İade>(returnDto);
            _manager.İade.UpdateOneReturn(entity);
            _manager.Save();
        }

    }
}
