import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const propertyId = searchParams.get('propertyId');

  if (!propertyId) {
    return NextResponse.json({ error: 'propertyId is required' }, { status: 400 });
  }

  try {
    const payload = await getPayload({ config: configPromise });

    // Find buildings for this property
    const buildings = await payload.find({
      collection: 'buildings',
      where: { property: { equals: propertyId } },
      limit: 100,
    });
    const buildingIds = buildings.docs.map(b => b.id);
    if (buildingIds.length === 0) return NextResponse.json({ rooms: [] });

    // Find floors in these buildings
    const floors = await payload.find({
      collection: 'floors',
      where: { building: { in: buildingIds } },
      limit: 100,
    });
    const floorIds = floors.docs.map(f => f.id);
    if (floorIds.length === 0) return NextResponse.json({ rooms: [] });

    // Find active rooms on these floors
    const rooms = await payload.find({
      collection: 'rooms',
      where: {
        floor: { in: floorIds },
        status: { equals: 'ACTIVE' }
      },
      limit: 100,
    });
    const roomIds = rooms.docs.map(r => r.id);
    if (roomIds.length === 0) return NextResponse.json({ rooms: [] });

    // Find available beds in these rooms
    const beds = await payload.find({
      collection: 'beds',
      where: {
        room: { in: roomIds },
        operational_status: { equals: 'AVAILABLE' },
        occupancy_status: { equals: 'VACANT' }
      },
      limit: 500,
    });

    // Group beds by room for the frontend BedSelector format
    const formattedRooms = rooms.docs.map(room => {
      const roomBeds = beds.docs
        .filter(b => typeof b.room === 'object' ? b.room.id === room.id : b.room === room.id)
        .map(b => ({
          id: b.id,
          name: b.bed_identifier,
          price: b.price,
          availableDates: 'Immediate' // Simplification for now
        }));

      return {
        id: room.id,
        name: room.room_number,
        type: room.room_type,
        beds: roomBeds,
      };
    }).filter(r => r.beds.length > 0); // Only return rooms that actually have available beds

    return NextResponse.json({ rooms: formattedRooms });
  } catch (error) {
    console.error('Availability API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 });
  }
}
