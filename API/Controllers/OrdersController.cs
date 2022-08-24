using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly IOrderService OrderService;
        private readonly IMapper Mapper;
        public OrdersController(IOrderService orderService, IMapper mapper)
        {
            this.Mapper = mapper;
            this.OrderService = orderService;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(OrderDto orderDto){
            var email = HttpContext.User.RetrieveEmailFromPrincipal();
            var address = Mapper.Map<AddressDto, Address>(orderDto.ShipToAddress);
            var order = await OrderService.CreateOrderAsync(email, orderDto.DeliveryMethodId, orderDto.BasketId, address);
            if(order == null) return BadRequest(new ApiResponse(400, "Problem Creating order"));
            return Ok(order);

        }
    }
}