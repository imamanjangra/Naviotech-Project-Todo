import { ListTodo } from "lucide-react";

export const EmptyTodo = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
        <ListTodo className="w-8 h-8 text-gray-500 dark:text-gray-400" />
      </div>

      <h2 className="text-base font-medium text-gray-700 dark:text-gray-200">
        No todos yet
      </h2>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Start by adding a new Todo 
      </p>
    </div>
  );
};

