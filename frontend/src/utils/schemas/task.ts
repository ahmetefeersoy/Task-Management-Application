import { z } from 'zod';

// Task priority enum
const taskPriorityEnum = z.enum(['LOW', 'MEDIUM', 'HIGH']);

// Task status enum
const taskStatusEnum = z.enum(['PENDING', 'COMPLETED']);

// Create task schema
export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, 'Task title is required')
    .min(3, 'Task title must be at least 3 characters long')
    .max(100, 'Task title cannot exceed 100 characters'),
  description: z
    .string()
    .max(500, 'Description cannot exceed 500 characters')
    .optional(),
  priority: taskPriorityEnum,
  dueDate: z
    .string()
    .optional()
    .refine((date) => {
      if (!date || date === '') return true; // Optional field or empty string
      const selectedDate = new Date(date);
      const now = new Date();
      return selectedDate >= now;
    }, {
      message: 'Due date cannot be in the past',
    }),
});

export type CreateTaskFormData = z.infer<typeof createTaskSchema>;

// Update task schema
export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(1, 'Task title is required')
    .min(3, 'Task title must be at least 3 characters long')
    .max(100, 'Task title cannot exceed 100 characters')
    .optional(),
  description: z
    .string()
    .max(500, 'Description cannot exceed 500 characters')
    .optional(),
  priority: taskPriorityEnum.optional(),
  status: taskStatusEnum.optional(),
  dueDate: z
    .string()
    .optional()
    .refine((date) => {
      if (!date) return true; // Optional field
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to start of day
      return selectedDate >= today;
    }, {
      message: 'Due date cannot be in the past',
    }),
});

export type UpdateTaskFormData = z.infer<typeof updateTaskSchema>;

// Export enums for use in components
export { taskPriorityEnum, taskStatusEnum };
