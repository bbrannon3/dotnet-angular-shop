using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IGenericRepository<Order> OrderRepo;
        private readonly IGenericRepository<DeliveryMethod> DmRepo;
        private readonly IGenericRepository<Product> ProductRepo;
        private readonly IBasketRepository BasketRepo;
        public OrderService(IGenericRepository<Order> orderRepo, IGenericRepository<DeliveryMethod> dmRepo, IGenericRepository<Product> productRepo, IBasketRepository basketRepo)
        {
            this.BasketRepo = basketRepo;
            this.ProductRepo = productRepo;
            this.DmRepo = dmRepo;
            this.OrderRepo = orderRepo;
        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress)
        {
            var basket = await BasketRepo.GetBasketAsync(basketId);
            var items = new List<OrderItem>();

            foreach (var item in basket.Items)
            {
                var productItem = await ProductRepo.GetByIdAsync(item.Id);
                var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.PictureUrl);
                var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
                items.Add(orderItem);
            }

            var deliveryMethod = await DmRepo.GetByIdAsync(deliveryMethodId);

            var subTotal = items.Sum(item => item.Price * item.Quantitiy);

            var order = new Order(items, buyerEmail, shippingAddress, deliveryMethod, subTotal);

            return order;
        }

        public Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            throw new NotImplementedException();
        }

        public Task<IReadOnlyList<Order>> GetORdersForUserAsync(string buyerEmail)
        {
            throw new NotImplementedException();
        }
    }
}