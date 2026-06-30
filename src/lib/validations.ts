import { z } from "zod";

// ── 枚举定义 ──
export const Role = z.enum(["USER", "ADMIN"]);
export type Role = z.infer<typeof Role>;

export const OrderStatus = z.enum([
  "PENDING",
  "PAID",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
]);
export type OrderStatus = z.infer<typeof OrderStatus>;

// 订单状态流转：当前状态 → 允许的下一个状态
export const ORDER_FLOW: Record<string, string[]> = {
  PENDING: ["PAID", "CANCELLED"],
  PAID: ["SHIPPED", "CANCELLED"],
  SHIPPED: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
};

// ── 用户相关 ──
export const registerSchema = z.object({
  name: z.string().min(2, "姓名至少 2 个字符").max(50),
  email: z.string().email("邮箱格式不正确"),
  password: z.string().min(6, "密码至少 6 位").max(100),
});

export const loginSchema = z.object({
  email: z.string().email("邮箱格式不正确"),
  password: z.string().min(1, "请输入密码"),
});

// ── 分类 ──
export const categorySchema = z.object({
  name: z.string().min(1, "分类名不能为空").max(50),
  slug: z
    .string()
    .min(1)
    .max(50)
    .regex(/^[a-z0-9-]+$/, "slug 只能包含小写字母、数字和连字符"),
  description: z.string().max(200).optional(),
});

// ── 商品 ──
export const productSchema = z.object({
  name: z.string().min(1, "商品名不能为空").max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/),
  description: z.string().max(5000).default(""),
  price: z.number().positive("价格必须大于 0").max(999999),
  images: z.array(z.string().url()).default([]),
  stock: z.number().int().min(0).default(0),
  isFeatured: z.boolean().default(false),
  categoryId: z.string().min(1, "请选择分类"),
});

// ── 购物车 ──
export const addCartSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1).default(1),
});

export const updateCartSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(0),
});

// ── 订单 ──
export const orderStatusSchema = z.object({
  status: OrderStatus,
});
