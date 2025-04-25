import { PrismaClient, Prisma } from '@/lib/generated/prisma';

import { prisma } from '@/lib/prisma';
//
// import type { Prisma } from '@prisma/client';

export async function getUser(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      addresses: true,
      orders: {
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });
}

export async function getProducts(params: {
  skip?: number;
  take?: number;
  where?: Prisma.ProductWhereInput;
  orderBy?: Prisma.ProductOrderByWithRelationInput;
}) {
  const { skip = 0, take = 10, where, orderBy } = params;

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      skip,
      take,
      where,
      orderBy,
      include: {
        category: true,
        reviews: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
    }),
    prisma.product.count({ where }),
  ]);

  return { products, total };
}

export async function getCategories() {
  return prisma.category.findMany({
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
  });
}

export async function getOrder(id: string) {
  return prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
      address: true,
    },
  });
}

export async function getUserOrders(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
      address: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function createOrder(data: Prisma.OrderCreateInput) {
  return prisma.order.create({
    data,
    include: {
      items: {
        include: {
          product: true,
        },
      },
      address: true,
    },
  });
}

export async function updateOrderStatus(id: string, status: Prisma.OrderUpdateInput['status']) {
  return prisma.order.update({
    where: { id },
    data: { status },
  });
}

export async function addToWishlist(userId: string, productId: string) {
  return prisma.wishlistItem.create({
    data: {
      user: { connect: { id: userId } },
      product: { connect: { id: productId } },
    },
  });
}

export async function removeFromWishlist(userId: string, productId: string) {
  return prisma.wishlistItem.delete({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });
}

export async function getUserWishlist(userId: string) {
  return prisma.wishlistItem.findMany({
    where: { userId },
    include: {
      product: {
        include: {
          category: true,
        },
      },
    },
  });
}
