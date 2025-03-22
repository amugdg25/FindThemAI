import { useEffect } from "react";

const ActionMenu = ({
  isOpen,
  onOpen,
  onClose,
  onEdit,
  onDelete,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && !target.closest(".action-menu")) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="relative action-menu" onClick={(e) => e.stopPropagation()}>
      {/* Three-dot button */}
      <div
        className="flex flex-col items-center justify-center gap-1 cursor-pointer p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 z-10"
        onClick={isOpen ? onClose : onOpen}
      >
        <span className="w-1 h-1 bg-gray-900 dark:bg-gray-300 rounded-full"></span>
        <span className="w-1 h-1 bg-gray-900 dark:bg-gray-300 rounded-full"></span>
        <span className="w-1 h-1 bg-gray-900 dark:bg-gray-300 rounded-full"></span>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-700 rounded-lg shadow-lg border dark:border-gray-600 z-50 overflow-hidden">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
              onClose();
            }}
            className="block w-full px-4 py-2 text-left text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            ✏️ Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
              onClose();
            }}
            className="block w-full px-4 py-2 text-left text-red-500 hover:bg-red-100 dark:hover:bg-red-700"
          >
            🗑 Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
