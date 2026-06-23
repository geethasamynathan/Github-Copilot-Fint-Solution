/**
 * Card Component
 * Reusable card container with shadow and padding
 */
const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
