import Button from "./Button";
function ConfirmAlert({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md">
        <p className="mb-4">Are you sure you want to logout?</p>
        <div className="flex justify-end">
          <Button className="mr-2" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Logout</Button> 
        </div>
      </div>
    </div>
  );
}

export default ConfirmAlert;
