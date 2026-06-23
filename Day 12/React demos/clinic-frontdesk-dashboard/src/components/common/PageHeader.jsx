/**
 * PageHeader Component
 * Displays the main page header with title and description
 */
const PageHeader = ({ title, description }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        {description && <p className="text-blue-100 text-lg">{description}</p>}
      </div>
    </div>
  );
};

export default PageHeader;
