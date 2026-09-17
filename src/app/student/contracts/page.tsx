import { FileText } from 'lucide-react';

export default function StudentContracts() {
  return (
    <div className="max-w-4xl space-y-8 pb-10">
      <div>
        <h1 className="font-display text-3xl font-medium mb-1">Contracts</h1>
        <p className="text-muted-foreground text-sm">Review and sign your tenancy agreements.</p>
      </div>
      <div className="bg-card border border-border rounded-2xl shadow-sm p-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium">Tenancy Agreement 2026-2027</h3>
            <p className="text-xs text-muted-foreground">Signed on Aug 25, 2026</p>
          </div>
        </div>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
          Active
        </span>
      </div>
    </div>
  );
}
