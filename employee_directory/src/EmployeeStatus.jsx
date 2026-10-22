
function EmployeeStatus({ isAvailable, onToggleStatus }) {
  return (
    <div className="availability-control">
      <span
        className={`availability-badge ${
          isAvailable ? "available" : "unavailable"
        }`}
      >
        <span className="online-dot"></span>
        {isAvailable ? "Available" : "Away"}
      </span>

      <button
        className="status-toggle"
        onClick={onToggleStatus}
      >
        Change Status
      </button>
    </div>
  );
}

export default EmployeeStatus;
