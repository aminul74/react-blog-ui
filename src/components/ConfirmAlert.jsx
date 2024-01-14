import Button from "./Button";

function ConfirmAlert({ onCancel, onConfirm, titleMsg, label }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h4 className="mb-4">Are you sure you want to {titleMsg}?</h4>
        <div className="flex justify-end">
          <Button
            className="mr-4 hover:bg-gray-200 rounded p-2"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            className="mr-2 inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-red-600 hover:bg-red-500 focus:bg-red-700 focus:ring-offset-red-700"
            onClick={onConfirm}
          >
            {label}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmAlert;
