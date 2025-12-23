import RecentActivity from "./components/RecentActivity";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-semibold text-gray-900">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Operational overview and system insights
        </p>
      </section>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Metric title="Observations" value="1,248" />
        <Metric title="Open Actions" value="84" />
        <Metric title="High Risk" value="14" />
        <Metric title="Compliance" value="96%" />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div className="bg-white border rounded-lg p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700">
            Insights
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            AI risk signals and trends will appear here.
          </p>
        </div>
      </section>
    </div>
  );
}

function Metric({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white border rounded-lg p-5 shadow-sm">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-2 text-2xl font-semibold text-gray-900">
        {value}
      </div>
    </div>
  );
}
