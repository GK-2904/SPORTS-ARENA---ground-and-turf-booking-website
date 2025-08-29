import { createField, createBooking } from '../services/firebaseService';

// Data migration utility
export const migrateDataToFirebase = async () => {
  try {
    // Import your existing data
    const existingData = await import('../../BackEnd/data.json');
    
    console.log('Starting migration...');
    
    // Migrate fields
    if (existingData.fields && existingData.fields.length > 0) {
      console.log(`Migrating ${existingData.fields.length} fields...`);
      
      for (const field of existingData.fields) {
        try {
          // Remove the id field as Firebase will generate a new one
          const { id, ...fieldData } = field;
          await createField(fieldData);
          console.log(`✅ Migrated field: ${field.name}`);
        } catch (error) {
          console.error(`❌ Failed to migrate field ${field.name}:`, error);
        }
      }
    }
    
    // Migrate bookings
    if (existingData.bookings && existingData.bookings.length > 0) {
      console.log(`Migrating ${existingData.bookings.length} bookings...`);
      
      for (const booking of existingData.bookings) {
        try {
          const { id, ...bookingData } = booking;
          await createBooking(bookingData);
          console.log(`✅ Migrated booking for field: ${booking.fieldName}`);
        } catch (error) {
          console.error(`❌ Failed to migrate booking for ${booking.fieldName}:`, error);
        }
      }
    }
    
    console.log('🎉 Migration completed!');
    
  } catch (error) {
    console.error('Migration failed:', error);
  }
};

// Function to check if data already exists in Firebase
export const checkFirebaseData = async (getFields, getBookings) => {
  try {
    const fields = await getFields();
    const bookings = await getBookings();
    
    console.log(`Firebase contains ${fields.length} fields and ${bookings.length} bookings`);
    
    if (fields.length === 0 && bookings.length === 0) {
      console.log('Firebase is empty. Ready for migration.');
      return true;
    } else {
      console.log('Firebase already contains data. Migration may not be needed.');
      return false;
    }
  } catch (error) {
    console.error('Error checking Firebase data:', error);
    return false;
  }
};

