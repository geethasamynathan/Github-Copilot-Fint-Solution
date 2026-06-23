import PageHeader from "../components/common/PageHeader";
import SummaryCards from "../components/common/SummaryCards";
import SearchBox from "../components/appointments/SearchBox";
import StatusFilter from "../components/appointments/StatusFilter";
import AppointmentList from "../components/appointments/AppointmentList";
import { useAppointments } from "../hooks/useAppointment";

/**
 * Dashboard Page
 * Main page displaying the clinic appointment dashboard
 */
const Dashboard = () => {
  const {
    loading,
    searchText,
    setSearchText,
    selectedStatus,
    setSelectedStatus,
    filteredAppointments,
    summary,
    updateAppointmentStatus,
  } = useAppointments();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <PageHeader
        title="Clinic Front Desk Dashboard"
        description="Manage and track patient appointments efficiently"
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Summary Cards */}
        <SummaryCards summary={summary} />

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <SearchBox searchText={searchText} onSearchChange={setSearchText} />
          <StatusFilter
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
          />
        </div>

        {/* Appointments List */}
        <AppointmentList
          appointments={filteredAppointments}
          loading={loading}
          onStatusChange={updateAppointmentStatus}
        />
      </div>
    </div>
  );
};

export default Dashboard;
