import { Calendar } from 'lucide-react';

export default function StudentBookings() {
  return (
    <div className="max-w-4xl space-y-8 pb-10">
      <div>
        <h1 className="font-display text-3xl font-medium mb-1">My Bookings</h1>
        <p className="text-muted-foreground text-sm">View your current, past, and future bookings.</p>
      </div>
      <div className="bg-card border border-border rounded-2xl shadow-sm p-8 text-center text-muted-foreground">
        <Calendar className="h-10 w-10 mx-auto mb-4 opacity-50" />
        <p>No past or future bookings found. Your current booking is active.</p>
      </div>
    </div>
  );
}
