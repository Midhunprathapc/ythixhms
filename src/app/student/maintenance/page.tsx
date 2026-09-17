import { Wrench } from 'lucide-react';

export default function StudentMaintenance() {
  return (
    <div className="max-w-4xl space-y-8 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-display text-3xl font-medium mb-1">Maintenance</h1>
          <p className="text-muted-foreground text-sm">Report issues and track maintenance requests.</p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90">
          New Request
        </button>
      </div>
      <div className="bg-card border border-border rounded-2xl shadow-sm p-8 text-center text-muted-foreground">
        <Wrench className="h-10 w-10 mx-auto mb-4 opacity-50" />
        <p>No active maintenance requests.</p>
      </div>
    </div>
  );
}
