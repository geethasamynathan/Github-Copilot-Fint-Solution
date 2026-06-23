import { memo } from "react";
import SummaryCard from "../common/SummaryCard";

/**
 * Summary Cards Icons
 */
const TotalIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
    />
  </svg>
);

const ScheduledIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const CheckedInIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const CompletedIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const CancelledIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

/**
 * SummaryCards Component
 * Display summary statistics for appointments
 */
const SummaryCards = memo(({ summary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      <SummaryCard
        title="Total Appointments"
        count={summary.total}
        icon={TotalIcon}
        color="blue"
      />
      <SummaryCard
        title="Scheduled"
        count={summary.scheduled}
        icon={ScheduledIcon}
        color="blue"
      />
      <SummaryCard
        title="Checked In"
        count={summary.checkedIn}
        icon={CheckedInIcon}
        color="yellow"
      />
      <SummaryCard
        title="Completed"
        count={summary.completed}
        icon={CompletedIcon}
        color="green"
      />
      <SummaryCard
        title="Cancelled"
        count={summary.cancelled}
        icon={CancelledIcon}
        color="red"
      />
    </div>
  );
});

SummaryCards.displayName = "SummaryCards";

export default SummaryCards;
