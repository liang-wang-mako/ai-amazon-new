export interface SalesData {
  date: string;
  revenue: number;
  orders: number;
}

export interface CategorySales {
  name: string;
  value: number;
}

export interface ProductPerformance {
  name: string;
  sales: number;
  revenue: number;
  views: number;
}

export interface CustomerMetrics {
  name: string;
  newCustomers: number;
  returningCustomers: number;
}

export interface AnalyticsSummary {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  topCategories: CategorySales[];
  recentSales: SalesData[];
}
