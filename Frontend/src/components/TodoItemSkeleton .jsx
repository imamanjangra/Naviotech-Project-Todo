export const TodoItemSkeleton = () => {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((_, index) => (
        <div
          key={index}
          className="flex items-start justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow animate-pulse"
        >
          
          <div className="flex items-start gap-3 flex-1 min-w-0">
          
            <div className="w-5 h-5 mt-1 rounded bg-gray-300 dark:bg-gray-700" />

           
            <div className="flex-1">
              <div className="h-5 w-full bg-gray-300 dark:bg-gray-700 rounded" />
            </div>
          </div>


          <div className="flex gap-2 ml-4 shrink-0">
            <div className="w-9 h-9 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="w-9 h-9 rounded bg-gray-300 dark:bg-gray-700" />
          </div>
        </div>
      ))}
    </div>
  );
};
