import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import type { RootState } from "../store";
import { setTasks, addTaskSuccess, updateTaskSuccess, deleteTaskSuccess } from "../store/taskslice";
import { fetchTasks, addTask, updateTask, deleteTask } from "../store/taskslice";
import { logout } from "../store/authslice";
import { createTaskSchema, type CreateTaskFormData } from '../utils/schemas';

interface TasksPageProps {
  onLogout: () => void;
}

const TasksPage: React.FC<TasksPageProps> = ({ onLogout }) => {
  const tasks = useSelector((state: RootState) => state.tasks.list);
  const dispatch = useDispatch();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'MEDIUM',
      dueDate: '',
    },
  });

  const loadTasks = useCallback(async () => {
    try {
      const tasksData = await fetchTasks();
      dispatch(setTasks(tasksData));
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const onSubmit = async (data: CreateTaskFormData) => {
    setIsLoading(true);
    try {
      const taskData = await addTask({
        title: data.title,
        description: data.description || '',
        status: "PENDING",
        priority: data.priority,
        dueDate: data.dueDate || undefined
      });
      dispatch(addTaskSuccess(taskData));
      reset();
      setShowAddForm(false);
      toast.success('✅ Task created successfully!');
    } catch (error) {
      console.error('Failed to add task:', error);
      toast.error('❌ Failed to create task. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTask = async (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      try {
        const newStatus = task.status === "COMPLETED" ? "PENDING" : "COMPLETED";
        await updateTask(id, { status: newStatus });
        dispatch(updateTaskSuccess({ id, status: newStatus }));
        const statusText = newStatus === "COMPLETED" ? "completed" : "pending";
        toast.success(`🔄 Task marked as ${statusText}!`);
      } catch (error) {
        console.error('Failed to update task:', error);
        toast.error('❌ Failed to update task. Please try again.');
      }
    }
  };

  const handleDeleteTask = async (id: number) => {
    const task = tasks.find(t => t.id === id);
    const taskTitle = task?.title || 'this task';
    
    // Beautiful styled confirmation toast
    toast((t) => (
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-6 max-w-sm">
        <div className="flex items-center mb-4">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Task</h3>
          <p className="text-sm text-gray-600 mb-6">
            Are you sure you want to delete <br/>
            <span className="font-medium text-gray-900">"{taskTitle}"</span>?<br/>
            This action cannot be undone.
          </p>
          
          <div className="flex gap-3 justify-center">
            <button
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await deleteTask(id);
                  dispatch(deleteTaskSuccess(id));
                  toast.success('🗑️ Task deleted successfully!');
                } catch (error) {
                  console.error('Failed to delete task:', error);
                  toast.error('❌ Failed to delete task. Please try again.');
                }
              }}
            >
              Delete
            </button>
            <button
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    ), {
      duration: Infinity,
      position: 'top-center',
      style: {
        background: 'transparent',
        boxShadow: 'none',
      }
    });
  };

  const handleLogout = () => {
    // Beautiful styled logout confirmation
    toast((t) => (
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-6 max-w-sm">
        <div className="flex items-center mb-4">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
            <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Logout</h3>
          <p className="text-sm text-gray-600 mb-6">
            Are you sure you want to logout?<br/>
            You will need to login again to access your tasks.
          </p>
          
          <div className="flex gap-3 justify-center">
            <button
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              onClick={() => {
                toast.dismiss(t.id);
                dispatch(logout());
                toast.success('👋 Logging out...', { duration: 1500 });
                setTimeout(() => {
                  onLogout();
                }, 1500);
              }}
            >
              Logout
            </button>
            <button
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    ), {
      duration: Infinity,
      position: 'top-center',
      style: {
        background: 'transparent',
        boxShadow: 'none',
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Add Task Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            + Add New Task
          </button>
        </div>

        {/* Add Task Form */}
        {showAddForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-semibold mb-4">Add New Task</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  {...register('title')}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.title ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter task title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.description ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Task description (optional)"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    {...register('priority')}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.priority ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                  {errors.priority && (
                    <p className="mt-1 text-sm text-red-600">{errors.priority.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date (Optional)
                  </label>
                  <input
                    type="datetime-local"
                    {...register('dueDate')}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.dueDate ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.dueDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.dueDate.message}</p>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Adding...' : 'Add'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${
                task.status === "COMPLETED" 
                  ? "border-gray-400" 
                  : task.priority === "HIGH"
                  ? "border-red-500"
                  : task.priority === "MEDIUM" 
                  ? "border-yellow-500"
                  : "border-green-500"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <input
                    type="checkbox"
                    checked={task.status === "COMPLETED"}
                    onChange={() => toggleTask(task.id)}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3
                        className={`text-lg font-medium ${
                          task.status === "COMPLETED"
                            ? "text-gray-500 line-through"
                            : "text-gray-800"
                        }`}
                      >
                        {task.title}
                      </h3>
                      {/* Priority Badge */}
                      <span className={`px-3 py-1 text-xs rounded-full font-medium ml-3 ${
                        task.priority === "HIGH" 
                          ? "bg-red-800 text-red-800" 
                          : task.priority === "MEDIUM"
                          ? "bg-yellow-900 text-yellow-900"
                          : "bg-blue-800 text-blue-800"
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                    
                    {task.description && (
                      <p
                        className={`mt-1 ${
                          task.status === "COMPLETED"
                            ? "text-gray-400 line-through"
                            : "text-gray-600"
                        }`}
                      >
                        {task.description}
                      </p>
                    )}
                    
                    {/* Due Date */}
                    {task.dueDate && (
                      <p className="mt-1 text-sm text-gray-500 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Due: {new Date(task.dueDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-red-600 hover:text-red-800 ml-4"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {tasks.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <p>
              You don't have any tasks yet. Start by adding your first task!
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default TasksPage;
