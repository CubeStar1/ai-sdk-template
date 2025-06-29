import { PageHeader } from '@/components/ui/page-header';
import DashboardClientWrapper from '@/components/dashboard/dashboard-client-wrapper';

export default async function DashboardPage() {

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="A real-time overview of pest and disease detections."
      >
      </PageHeader>
      <div className="mt-8">
        <DashboardClientWrapper />
      </div>
    </>
  );
}

