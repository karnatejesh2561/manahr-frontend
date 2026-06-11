import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  terms: z.boolean().refine((val) => val === true, 'You must accept the terms'),
});

export const forgotSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const dealSchema = z.object({
  c: z.string().min(1, 'Company name is required'),
  v: z.coerce.number().min(1, 'Value must be greater than 0'),
  l: z.string().min(1, 'Owner is required'),
  s: z.string().min(1, 'Stage is required'),
  p: z.coerce.number().min(0, 'Probability must be at least 0').max(100, 'Probability cannot exceed 100'),
  due: z.string().min(1, 'Due date is required'),
});

export const employeeSchema = z.object({
  n: z.string().min(1, 'Name is required'),
  r: z.string().min(1, 'Role is required'),
  d: z.string().min(1, 'Department is required'),
  s: z.string().min(1, 'Status is required'),
  e: z.string().email('Invalid email address'),
  l: z.string().min(1, 'Location is required'),
  t: z.string().min(1, 'Tenure is required'),
});

export const invoiceSchema = z.object({
  c: z.string().min(1, 'Client name is required'),
  a: z.coerce.number().min(1, 'Amount must be greater than 0'),
  s: z.string().min(1, 'Status is required'),
  due: z.string().min(1, 'Due date is required'),
});

export const inventorySchema = z.object({
  sku: z.string().min(1, 'SKU is required'),
  n: z.string().min(1, 'Name is required'),
  cat: z.string().min(1, 'Category is required'),
  stock: z.coerce.number().min(0, 'Stock cannot be negative'),
  reorder: z.coerce.number().min(0, 'Reorder point cannot be negative'),
});

export const taskSchema = z.object({
  t: z.string().min(1, 'Task title is required'),
  status: z.string().min(1, 'Status is required'),
  p: z.string().min(1, 'Priority is required'),
  a: z.string().min(1, 'Assignee is required'),
  d: z.string().min(1, 'Due date is required'),
});

export const userSchema = z.object({
  n: z.string().min(1, 'Name is required'),
  d: z.string().email('Invalid email address'),
  r: z.string().min(1, 'Role is required'),
  s: z.string().min(1, 'Status is required'),
  mfa: z.boolean().default(false),
});

export const settingsSchema = z.object({
  companyName: z.string().min(1, 'Legal name is required'),
  taxId: z.string().min(1, 'Tax ID is required'),
  website: z.string().min(1, 'Website is required'),
  industry: z.string().min(1, 'Industry is required'),
  headOffice: z.string().min(1, 'Head office is required'),
});
