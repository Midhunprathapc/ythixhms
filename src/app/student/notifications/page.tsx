import { Bell } from 'lucide-react';

export default function StudentNotifications() {
  return (
    <div className="max-w-4xl space-y-8 pb-10">
      <div>
        <h1 className="font-display text-3xl font-medium mb-1">Notifications</h1>
        <p className="text-muted-foreground text-sm">Updates regarding your stay and payments.</p>
      </div>
      <div className="bg-card border border-border rounded-2xl shadow-sm p-8 text-center text-muted-foreground">
        <Bell className="h-10 w-10 mx-auto mb-4 opacity-50" />
        <p>You're all caught up!</p>
      </div>
    </div>
  );
}
