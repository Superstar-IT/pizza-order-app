import { Order } from '../types';

// In a real app, this would interact with localStorage or an API
class OrderStorage {
  private orders: Order[] = [];

  saveOrder(order: Order): void {
    this.orders.push(order);
    // In a real app, you might also save to localStorage:
    // localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  getOrders(): Order[] {
    return [...this.orders];
    // In a real app, you might load from localStorage:
    // const stored = localStorage.getItem('orders');
    // return stored ? JSON.parse(stored) : [];
  }

  clearOrders(): void {
    this.orders = [];
  }
}

export const orderStorage = new OrderStorage();
