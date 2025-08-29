import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

// Collection references
const fieldsCollection = collection(db, 'fields');
const bookingsCollection = collection(db, 'bookings');

// Fields operations
export const getFields = async () => {
  try {
    const querySnapshot = await getDocs(fieldsCollection);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting fields:', error);
    throw error;
  }
};

export const getFieldById = async (id) => {
  try {
    const docRef = doc(db, 'fields', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('Field not found');
    }
  } catch (error) {
    console.error('Error getting field:', error);
    throw error;
  }
};

export const createField = async (fieldData) => {
  try {
    const docRef = await addDoc(fieldsCollection, {
      ...fieldData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { id: docRef.id, ...fieldData };
  } catch (error) {
    console.error('Error creating field:', error);
    throw error;
  }
};

export const updateField = async (id, fieldData) => {
  try {
    const docRef = doc(db, 'fields', id);
    await updateDoc(docRef, {
      ...fieldData,
      updatedAt: serverTimestamp()
    });
    return { id, ...fieldData };
  } catch (error) {
    console.error('Error updating field:', error);
    throw error;
  }
};

export const deleteField = async (id) => {
  try {
    const docRef = doc(db, 'fields', id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting field:', error);
    throw error;
  }
};

// Bookings operations
export const getBookings = async () => {
  try {
    const querySnapshot = await getDocs(bookingsCollection);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting bookings:', error);
    throw error;
  }
};

export const getBookingsByFieldId = async (fieldId) => {
  try {
    const q = query(bookingsCollection, where('fieldId', '==', fieldId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting bookings by field ID:', error);
    throw error;
  }
};

export const createBooking = async (bookingData) => {
  try {
    const docRef = await addDoc(bookingsCollection, {
      ...bookingData,
      createdAt: serverTimestamp(),
      status: 'Active'
    });
    return { id: docRef.id, ...bookingData };
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

export const updateBooking = async (id, bookingData) => {
  try {
    const docRef = doc(db, 'bookings', id);
    await updateDoc(docRef, {
      ...bookingData,
      updatedAt: serverTimestamp()
    });
    return { id, ...bookingData };
  } catch (error) {
    console.error('Error updating booking:', error);
    throw error;
  }
};

export const deleteBooking = async (id) => {
  try {
    const docRef = doc(db, 'bookings', id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting booking:', error);
    throw error;
  }
};

// Search and filter operations
export const searchFields = async (searchTerm, statusFilter, typeFilter) => {
  try {
    let q = fieldsCollection;
    
    // Apply filters
    if (statusFilter && statusFilter !== 'All') {
      q = query(q, where('status', '==', statusFilter));
    }
    
    if (typeFilter && typeFilter !== 'All') {
      q = query(q, where('type', '==', typeFilter));
    }
    
    const querySnapshot = await getDocs(q);
    let fields = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Apply search filter on client side for better performance
    if (searchTerm) {
      fields = fields.filter(field => 
        field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        field.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return fields;
  } catch (error) {
    console.error('Error searching fields:', error);
    throw error;
  }
};
